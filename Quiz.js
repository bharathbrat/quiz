/* GCompris - Quiz.js
 *
 * Copyright (C) 2014 <YOUR NAME HERE>
 *
 * Authors:
 *   <THE GTK VERSION AUTHOR> (GTK+ version)
 *   "YOUR NAME" <YOUR EMAIL> (Qt Quick port)
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
.pragma library
.import QtQuick 2.0 as Quick


var currentLevel = 0
var numberOfLevel = 5
var items
var sample = [{
                  "question": "How many legs does a cat have?",
                  "answer": "4"
              },
              {
                  "question": "How many legs does a ostrich have?",
                  "answer": "2"
              },
              {
                  "question": "How many hours in a day?",
                  "answer": "24"
              },
              {
                  "question":"How many minutes in a hour?",
                  "answer": "60"
              },{
                  "question":"How many days in a leap year?",
                  "answer": "366"
              }];
//define answers for each question so that the answers are relevant (all but one are wrong)
var choices = [['2','4','1','6'],['1','2','0','4'],['24','12','6','32'],['12','60','45','120'],['365','300','366','255']]
var correctAnswer

function start(items_) {
    console.log("Quiz activity: start")
    items = items_
    currentLevel = 0
    initLevel()
}

function stop() {
    console.log("Quiz activity: stop")
}

function initLevel() {
    console.log("initLevel called.")
    items.bar.level = currentLevel + 1
    reset()
    setUp(items.bar.level)
}

function reset(){
    console.log("reset called.")
    items.rect1.color = "blue"
    items.rect2.color = "blue"
    items.rect3.color = "blue"
    items.rect4.color = "blue"
    items.rect1.opacity = 0.1
    items.rect2.opacity = 0.1
    items.rect3.opacity = 0.1
    items.rect4.opacity = 0.1
}

function generateRandomIndex() {
//returns an array containing 4 elements arranged in random order to provide randomness in displaying choices
    var index = []
    var i = 0
    var number
    while(i<4){
        number = Math.floor(Math.random() * 10000) % 4
        if(index.indexOf(number)<0){
            index.push(number)
            i++
        }
    }
    return index
}

function setUp(level){
    console.log("setUp called.")
    var used=[]
    var i=0
    var number
    var currentChoices = choices[level-1]
    var index = generateRandomIndex()
    items.question.text = sample[level-1].question

    while(i<4){
        if(currentChoices[index[i]] == sample[level-1].answer){
            correctAnswer = "answer"+(i+1).toString() //store the correct answer in correctAnswer
            console.log(correctAnswer)
        }
        i++
    }
    items.answer1.text = "a) "+ currentChoices[index[0]]
    items.answer2.text = "b) "+ currentChoices[index[1]]
    items.answer3.text = "c) "+ currentChoices[index[2]]
    items.answer4.text = "d) "+ currentChoices[index[3]]
    console.log("answers set.")
}

function changeColor(answer, color){
//change color to red (wrong answer) or green (correct answer)

    if(answer == 'answer1'){
        items.rect1.color = color
        items.rect1.opacity = 0.5
    }else if(answer == 'answer2'){
        items.rect2.color = color
        items.rect2.opacity = 0.5
    }else if(answer == 'answer3'){
        items.rect3.color = color
        items.rect3.opacity = 0.5
    }else if(answer == 'answer4'){
        items.rect4.color = color
        items.rect4.opacity = 0.5
    }
}

function clickHandler(answer){
    if(answer == correctAnswer){
        changeColor(answer,'green')
        items.bonus.good("tux")
    }
    else{
        changeColor(answer,'red')
    }
}

function nextLevel() {
    if(numberOfLevel <= ++currentLevel ) {
        currentLevel = 0
    }
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }
    initLevel();
}
