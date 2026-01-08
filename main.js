function gradeConverter(grade){
    switch (grade){
            case "A+":
                return 4.0;
            case "A":
                return 4.0;

            case "B+":
                return 3.5;
            case "B":
                return 3;
            case "C+":
                return 2.5;
            case "C":
                return 2;
            case "D+":
                return 1.5;
            case "D":
                return 1;
            case "E":
                return 0;
            default:
                console.log("Grade Not Found");
    }
}
const courses=[{courseName:"Calculus",courseGrade:"A+",courseCredit:1},{courseName:"Calculus",courseGrade:"A+",courseCredit:1},{courseName:"Statistics",courseGrade:"A+",courseCredit:1},{courseName:"Discrete Structutes and theory",courseGrade:"A+",courseCredit:1},{courseName:"Economics",courseGrade:"A+",courseCredit:1},{courseName:"Leadership",courseGrade:"B+",courseCredit:0.5}];
let gradePoints=0;
let totalCredits=0;
for(let i=0;i<courses.length;i++){
    gradePoints+=gradeConverter(courses[i].courseGrade)*courses[i].courseCredit;
    totalCredits+=courses[i].courseCredit;
}


gpa=gradePoints/totalCredits;
console.log(gpa);
