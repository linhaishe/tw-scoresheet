let readlineSync = require('readline-sync');

function main() {
    let allStudentScores = [{
        name: '张三',
        stuid: '0001',
        class: '001',
        chinese: 75,
        math: 95,
        english: 80,
        programme: 80
    }];
    let select;
    do {
        select = readlineSync.question(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`);
        response(select, allStudentScores);
    } while (select !== "3");
}

function response(select, allStudentScores) {
    if (select === "1") {
        addStudentAchievement(allStudentScores);
    } else if (select === "2") {
        printReport(allStudentScores);
    } else if (select === "3") {
        exit();
    } else {
        console.log("请按要求输入选项")
    }
}


function addStudentAchievement(allStudentScores) {
    let studentScore = {};

    let info = readlineSync.question(`请输入学生信息（格式：姓名,学号,班级,学科:成绩,...），按回车提交：`);
    let res = info.split("，");
    if (res.length !== 7) {
        console.log("请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）")
    } else {
        studentScore["name"] = res[0];
        studentScore["stuid"] = res[1];
        studentScore["class"] = res[2];
        let sub1 = res[3].split("：");
        let sub2 = res[4].split("：");
        let sub3 = res[5].split("：");
        let sub4 = res[6].split("：");
        studentScore["chinese"] = parseInt(sub1[1]);
        studentScore["math"] = parseInt(sub2[1]);
        studentScore["english"] = parseInt(sub3[1]);
        studentScore["programme"] = parseInt(sub4[1]);
        allStudentScores.push(studentScore)
        console.log("学生" + res[0] + "的成绩被添加")
    }
}

function printReport(allStudentScores) {
    let info = readlineSync.question(`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
    let stuId = info.split("，");
    //console.log(stuId);
    for (let i of allStudentScores) {
        let sumScores = i.chinese + i.math + i.english + i.programme;
        i["sum"] = sumScores;
        i["average"] = sumScores / 4;
    }
    //console.log(allStudentScores);
    let classAverage = allStudentScores.reduce((a, b) => a.sum + b.sum) / allStudentScores.length;
    //console.log(classAverage)
    let classMedian;
    if (allStudentScores.length % 2 == 0) {
        classMedian = (allStudentScores[allStudentScores.length / 2 - 1].sum + allStudentScores[allStudentScores.length / 2].sum) / 2;
    } else {
        classMedian = allStudentScores[(allStudentScores.length + 1) / 2 - 1].sum;
    }
    //console.log(classMedian)
    let str = '';
    for (i of allStudentScores) {
        for (j of stuId) {
            if (j == i.stuid) {
                str += i.name + "|" + i.chinese + "|" + i.math + "|" + i.english + "|" + i.programme + "|" + i.average + "|" + i.sum;
            }
        }
    }

    let result = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
${str}
========================
全班总分平均数：${classAverage}
全班总分中位数：${classMedian}`
    console.log(result);
}

function exit() {
    return '';
}

main()