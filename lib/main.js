const readlineSync = require('readline-sync');//导入模块的方法
const iconv = require('iconv-lite');
const student = require('./student');
const report = require('./report');
global.studentAchievementTotalLists = [];
function Main() {
    console.log(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
`);
    let input = readlineSync.question('请输入你的选择（1～3）：');
    console.log(input);
    if (input === "1") {
        buidMainMenuString();
        return Main();
    } else if (input === "2") {
        let studentAchievementArray = student.addStudentAchievement();
        let i = student.judgeStudentInformation(studentAchievementArray);//参数判断是否合理
        while (i === false) {
            studentAchievementArray = student.againInput();
            i = student.judgeStudentInformation(student.judgeStudentInformation(studentAchievementArray));
        }
        let correctInformation = student.judgeAchievementInformation(studentAchievementArray);
        student.printStudentPrompt(correctInformation);
        return Main();
    } else if (input === "3") {
        report.buildReport(studentAchievementTotalLists);
        return Main();
    } else if (input === "4") {
        exit();
    } else {
        console.log("输入错误请重新输入！");
        return Main();
    }
}

//菜单String
function buidMainMenuString() {
    console.log(`1. 添加学生
    2. 生成成绩单
    3. 退出
    请输入你的选择（1～3）：`);
}

//退出
function exit() {
}

//ZL,1,HAN,2,数学:1,语文:2,英语:3,编程:4
Main();

module.exports = {
    Main
};