'use strict';
const cli = require('cli-interact');
const Student = require('./student');

var studentList = {}
var scoreList = []

function main() {
    // 反引号``: ES6 引入的模板字符串
    let choose = cli.question('1. 添加学生\n' +
                              '2. 生成成绩单\n' +
                              '3. 退出请输入你的选择（1～3）：');
    if(choose === '1')
        while(1){
            let inputs = cli.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
            let success = addStudentAndScore(inputs);
            if(success){ break; }
        }
    else if(choose === '2'){
        while(1){
            let inputs = cli.question('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
            let success = printStudentAndScore(inputs);
            if(success){ break; }
        }
    }else{
        return null;
    }
    main();
}


function addStudentAndScore(inputs){
    let inputList = inputs.split(', ');
    try{
        let student = new Student(inputList[0], inputList[1], inputList[2], inputList[3]);

        studentList[student.id] = {};
        studentList[student.id]["infor"] = student;
        studentList[student.id]["score"] = {};
        studentList[student.id]["total"] = 0;

        for(let i of [4, 5, 6, 7]){
            let subject = inputList[i].split(': ')[0];
            let score = inputList[i].split(': ')[1];
            studentList[student.id]["score"][subject] = score;

            studentList[student.id]["total"] += parseInt(score);
        }
        studentList[student.id]["average"] = studentList[student.id]["total"] / 4.0
        scoreList.push(studentList[student.id]["total"]);
        console.log('学生' + student.name + '的成绩被添加')
        return true;
    }
    catch (e){
        console.log('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）');
        return false;
    }
}


function printStudentAndScore(inputs){
    let inputList = inputs.split(', ');
    // try {
    console.log('成绩单\n姓名|数学|语文|英语|编程|平均分|总分');
    console.log('========================');
    for(let i in inputList){
        let studentNum = inputList[i];
        if(studentList[studentNum]){
            let student = studentList[studentNum]
            let string = '';
            string += student["infor"].name + "|";
            string += student["score"]["数学"] + "|";
            string += student["score"]["语文"] + "|";
            string += student["score"]["英语"] + "|";
            string += student["score"]["编程"] + "|";
            string += student["average"] + "|";
            string += student["total"];
            console.log(string);
        }else{
            continue;
        }
    }
    console.log("========================");

    let total = 0;
    for(let i in scoreList){
        total += parseInt(scoreList[i]);
    }
    console.log("全班总分平均数：" + total / parseFloat(scoreList.length));

    scoreList.sort(function(a, b){ return a - b});
    console.log("全班总分中位数：" + scoreList[scoreList.length/2].toString());
    // }
    // catch (e){
    //     console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    // }
    return true;
}

module.exports = main;
module.exports.addStudentAndScore = addStudentAndScore;
module.exports.printStudentAndScore = printStudentAndScore;