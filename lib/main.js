let scanf = require("scanf");
let database = require("./database");

let data = database.loadStu();

// aaa,001,a,1,math:60,chinese:60,englinsh:60,computer:60
// bbb,002,a,2,math:60,chinese:60,englinsh:60,computer:60
// ccc,003,a,1,math:60,chinese:60,englinsh:60,computer:60

// 添加学生成绩
function addStudent() {
    console.log("请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：");
    let str = scanf("%s");
    let arr = str.split(",");
    while (arr.length !== 7) {
        console.log("请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：")
        str = scanf("%s");
        arr = str.split(",");
    }

    for (let stu of data) {
        if (stu.name === arr[0] && stu.stuNum === arr[1] && stu.class === arr[3]) {
            stu.math = arr[4].split(":")[1];
            stu.chinese = arr[5].split(":")[1];
            stu.englinsh = arr[6].split(":")[1];
            stu.computer = arr[7].split(":")[1];
            console.log("学生" + stu.name + "的成绩被添加");
        }
    }
}

// 打印成绩
function printScore() {
    console.log("成绩单\n" +
        "姓名|数学|语文|英语|编程|平均分|总分 \n" +
        "========================");
    let cAvg = 0;
    for (let stu of data) {
        let sum = parseFloat(stu.math) + parseFloat(stu.chinese) + parseFloat(stu.englinsh) + parseFloat(stu.computer);
        let avg = sum / 4;
        console.log(`${stu.name}|${stu.math}|${stu.chinese}|${stu.englinsh}|${stu.computer}|${avg}|${sum}`);
        cAvg += avg;
    }
    console.log("========================\n" +
        "全班总分平均数：" + cAvg / data.length +"\n" +
        "全班总分中位数：");
}

// 主函数
function main() {
    while(true) {
        console.log("1. 添加学生\n2. 生成成绩单\n3. 退出\n请输入你的选择（1～3）：\n");
        let num = scanf("%d");
        switch (num) {
            case 1:
                addStudent();
                break;
            case 2:
                printScore();
                break;
            case 3:
                console.log("程序退出");
                break;
            default:
                console.log("输入格式不正确");
                break;
        }
        if (num === 3) {
            break;
        }
    }

}

main();

module.exports = () => {
    main();
};