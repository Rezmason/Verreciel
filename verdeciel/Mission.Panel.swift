//  Created by Devine Lu Linvega on 2015-07-07.
//  Copyright (c) 2015 XXIIVV. All rights reserved.

import UIKit
import QuartzCore
import SceneKit
import Foundation

class PanelMission : Panel
{
	var locationPanel:SCNNode!

	var questPanel:SCNNode!
	
	var quest1 = SCNLabel(scale:0.09)
	var quest1Progress = SCNProgressBar(width: CGFloat(templates.leftMargin * Float(2.0)))
	var quest2 = SCNLabel(scale:0.09)
	var quest2Progress = SCNProgressBar(width: CGFloat(templates.leftMargin * Float(2.0)))
	var quest3 = SCNLabel(scale:0.09)
	var quest3Progress = SCNProgressBar(width: CGFloat(templates.leftMargin * Float(2.0)))
	var quest4 = SCNLabel(scale:0.09)
	var quest4Progress = SCNProgressBar(width: CGFloat(templates.leftMargin * Float(2.0)))
	
	// MARK: Default -
	
	override func setup()
	{
		name = "mission"
		
		// Decals
		
		decals.position = SCNVector3(x: 0, y: 0, z: templates.radius)
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.left,templates.top - 0.2,0), nodeB: SCNVector3(templates.left + 0.2,templates.top,0), color: grey))
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.right,templates.top - 0.2,0), nodeB: SCNVector3(templates.right - 0.2,templates.top,0), color: grey))
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.left,templates.bottom + 0.2,0), nodeB: SCNVector3(templates.left + 0.2,templates.bottom,0), color: grey))
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.right,templates.bottom + 0.2,0), nodeB: SCNVector3(templates.right - 0.2,templates.bottom,0), color: grey))
		
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.left,templates.top - 0.2,0), nodeB: SCNVector3(templates.left,templates.bottom + 0.2,0), color: grey))
		decals.addChildNode(SCNLine(nodeA: SCNVector3(templates.right,templates.top - 0.2,0), nodeB: SCNVector3(templates.right,templates.bottom + 0.2,0), color: grey))
		
		locationPanel = Panel()
		interface.addChildNode(locationPanel)
	
		questPanel = SCNNode()
		questPanel.position = SCNVector3(0,0,0)
		
		quest1.position = SCNVector3(x: templates.leftMargin, y: 1, z: 0)
		questPanel.addChildNode(quest1)
		quest1Progress.position = SCNVector3(x: 0, y: -0.3, z: 0)
		quest1Progress.eulerAngles.y = Float( degToRad(180))
		quest1.addChildNode(quest1Progress)
		
		quest2.position = SCNVector3(x: templates.leftMargin, y: 0.4, z: 0)
		questPanel.addChildNode(quest2)
		quest2Progress.position = SCNVector3(x: 0, y: -0.3, z: 0)
		quest2Progress.eulerAngles.y = Float( degToRad(180))
		quest2.addChildNode(quest2Progress)
		
		quest3.position = SCNVector3(x: templates.leftMargin, y: -0.2, z: 0)
		questPanel.addChildNode(quest3)
		quest3Progress.position = SCNVector3(x: templates.rightMargin * 2, y: -0.3, z: 0)
		quest3.addChildNode(quest3Progress)
		
		quest4.position = SCNVector3(x: templates.leftMargin, y: -0.8, z: 0)
		questPanel.addChildNode(quest4)
		quest4Progress.position = SCNVector3(x: templates.rightMargin * 2, y: -0.3, z: 0)
		quest4.addChildNode(quest4Progress)
		
		interface.addChildNode(questPanel)
		
		port.input = eventTypes.item
		port.output = eventTypes.unknown
		
		footer.addChildNode(SCNHandle(destination: SCNVector3(0,0,1),host:self))
		
		locationPanel.opacity = 0
	}
	
	override func installedFixedUpdate()
	{
		if capsule.isDocked && capsule.dock.isComplete == false {
			panelUpdate()
		}
		else{
			missionUpdate()
		}
	}
	
	func missionUpdate()
	{
		if isInstalled == false { return }
		
		label.update(name!, color: white)
		
		let latestTutorialQuest = quests.tutorial[quests.tutorialQuestId]
		let latestFalvetQuest = quests.falvet[quests.falvetQuestId]
		let latestSenniQuest = quests.senni[quests.senniQuestId]
		let latestUsulQuest = quests.usul[quests.usulQuestId]
		
		// Tutorial Quest Line
		let tutorialProgress = CGFloat(quests.tutorialQuestId) / CGFloat(quests.tutorial.count)
		quest1.update(latestTutorialQuest.name!)
		quest1Progress.update(tutorialProgress * 100)
		
		// Falvet Quest Line
		let falvetProgress = CGFloat(quests.falvetQuestId) / CGFloat(quests.falvet.count)
		quest2.update(latestFalvetQuest.name!)
		quest2Progress.update(falvetProgress * 100)
		
		// Senni Quest Line
		let senniProgress = CGFloat(quests.senniQuestId) / CGFloat(quests.senni.count)
		quest3.update(latestSenniQuest.name!)
		quest3Progress.update(senniProgress * 100)
		
		// Usul Quest Line
		let usulProgress = CGFloat(quests.usulQuestId) / CGFloat(quests.usul.count)
		quest4.update(latestUsulQuest.name!)
		quest4Progress.update(usulProgress * 100)
		
		if quests.falvetQuestId == 0 { quest2.update(grey) } else{ quest2.update(white) }
		if quests.senniQuestId == 0 { quest3.update(grey) } else{ quest3.update(white) }
		if quests.usulQuestId == 0 { quest4.update(grey) } else{ quest4.update(white) }
	}
	
	func panelUpdate()
	{
		if isInstalled == false { return }
		
		label.update(capsule.dock.name!)
		locationPanel.update()
	}
	
	// MARK: Ports -
	
	override func listen(event:Event)
	{
		
	}
	
	override func bang()
	{
		
	}
	
	// MARK: Custom -
	
	func complete()
	{
		// Animate
		
		SCNTransaction.begin()
		SCNTransaction.setAnimationDuration(0.5)
		
		locationPanel.position = SCNVector3(0,0,-0.5)
		locationPanel.opacity = 0
		
		SCNTransaction.setCompletionBlock({

			self.questPanel.position = SCNVector3(0,0,-0.5)
			
			SCNTransaction.begin()
			SCNTransaction.setAnimationDuration(0.5)
			
			self.questPanel.position = SCNVector3(0,0,0)
			self.questPanel.opacity = 1
			
			SCNTransaction.setCompletionBlock({
				capsule.dock.isComplete = true
				capsule.dock.update()
			})
			SCNTransaction.commit()
		})
		SCNTransaction.commit()
	}
	
	func connectToLocation(location:Location)
	{
		if location.isComplete == true { return }
		
		locationPanel.empty()
		locationPanel.add(location.panel())
		
		// Animate
		
		SCNTransaction.begin()
		SCNTransaction.setAnimationDuration(0.5)
		
		questPanel.position = SCNVector3(0,0,-0.5)
		questPanel.opacity = 0
		
		SCNTransaction.setCompletionBlock({
			
			self.locationPanel.position = SCNVector3(0,0,-0.5)
			
			SCNTransaction.begin()
			SCNTransaction.setAnimationDuration(0.5)
			
			self.locationPanel.position = SCNVector3(0,0,0)
			self.locationPanel.opacity = 1
			
			SCNTransaction.commit()
		})
		SCNTransaction.commit()
	}
	
	func disconnectFromLocation()
	{
		// Animate
		
		SCNTransaction.begin()
		SCNTransaction.setAnimationDuration(0.5)
		
		locationPanel.position = SCNVector3(0,0,-0.5)
		locationPanel.opacity = 0
		
		SCNTransaction.setCompletionBlock({
			
			self.questPanel.position = SCNVector3(0,0,-0.5)
			
			SCNTransaction.begin()
			SCNTransaction.setAnimationDuration(0.5)
			
			self.questPanel.position = SCNVector3(0,0,0)
			self.questPanel.opacity = 1
			
			SCNTransaction.setCompletionBlock({
				self.locationPanel.empty()
			})
			SCNTransaction.commit()
		})
		SCNTransaction.commit()
	}
	
	override func onInstallationBegin()
	{
		ui.addWarning("Installing", duration: 3)
		player.lookAt(deg: -180)
	}
}