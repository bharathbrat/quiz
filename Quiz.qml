/* GCompris - Quiz.qml
 *
 * Copyright (C) 2014 <YOUR NAME HERE>
 *
 * Authors:
 *   <THE GTK VERSION AUTHOR> (GTK+ version)
 *   YOUR NAME <YOUR EMAIL> (Qt Quick port)
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */
import QtQuick 2.1

import "qrc:/gcompris/src/core"
import "Quiz.js" as Activity

ActivityBase {
    id: activity

    onStart: focus = true
    onStop: {}

    pageComponent: Rectangle {
        id: background
        anchors.fill: parent
        color: "#ABCDEF"
        signal start
        signal stop

        Component.onCompleted: {
            activity.start.connect(start)
            activity.stop.connect(stop)
        }

        // Add here the QML items you need to access in javascript
        QtObject {
            id: items
            property Item main: activity.main
            property alias background: background
            property alias question: question
            property alias answer1: answer1
            property alias answer2: answer2
            property alias answer3: answer3
            property alias answer4: answer4
            property alias rect1: rect1
            property alias rect2: rect2
            property alias rect3: rect3
            property alias rect4: rect4
            property alias bar: bar
            property alias bonus: bonus
        }

        onStart: { Activity.start(items) }
        onStop: { Activity.stop() }

        Text{
            id: question
            x: parent.width/8
            y: parent.height/6
            text: ""
            font.pointSize: 24
        }

        Text{
            id: answer1
            text: ""
            x: parent.width/8
            y:parent.height * 0.25
            font.pointSize: 24
            Rectangle{
                id: rect1
                anchors.centerIn: parent
                width: parent.width
                height: parent.height
                color: "blue"
                opacity: 0.1
            }
            MouseArea{
                anchors.fill: parent
                onClicked: {Activity.clickHandler('answer1'); particle.emitter.burst(20)}
            }
        }

        Text{
            id: answer2
            text: ""
            x: parent.width/8
            y:parent.height * 0.4
            font.pointSize: 24
            Rectangle{
                id: rect2
                anchors.centerIn: parent
                width: parent.width
                height: parent.height
                color: "blue"
                opacity: 0.1
            }
            MouseArea{
                anchors.fill: parent
                onClicked: {Activity.clickHandler('answer2'); particle.emitter.burst(20)}
            }
        }

        Text{
            id: answer3
            text: ""
            x: parent.width/8
            y:parent.height * 0.55
            font.pointSize: 24
            Rectangle{
                id: rect3
                anchors.centerIn: parent
                width: parent.width
                height: parent.height
                color: "blue"
                opacity: 0.1
            }
            MouseArea{
                anchors.fill: parent
                onClicked: {Activity.clickHandler('answer3'); particle.emitter.burst(20)}
            }
        }

        Text{
            id: answer4
            text: ""
            x: parent.width/8
            y:parent.height * 0.70
            font.pointSize: 24
            Rectangle{
                id: rect4
                anchors.centerIn: parent
                width: parent.width
                height: parent.height
                color: "blue"
                opacity: 0.1
            }
            MouseArea{
                anchors.fill: parent
                onClicked: {Activity.clickHandler('answer4'); particle.emitter.burst(20)}
            }
        }

        ParticleSystemStar{
            id: particle
        }


        DialogHelp {
            id: dialogHelp
            onClose: home()
        }

        Bar {
            id: bar
            content: BarEnumContent { value: help | home | previous | next }
            onHelpClicked: {
                displayDialog(dialogHelp)
            }
            onPreviousLevelClicked: Activity.previousLevel()
            onNextLevelClicked: Activity.nextLevel()
            onHomeClicked: activity.home()
        }

        Bonus {
            id: bonus
            Component.onCompleted: win.connect(Activity.nextLevel)
        }
    }

}
