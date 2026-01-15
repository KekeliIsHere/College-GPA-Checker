const courses=[];

//Put this function so that it easily coverts the grade from the dropdown box into the number representation.
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
                return 0;
            
    }
}
//So this function responds to the Add Course Button. 
function addCourse(){
    //So everytime some course details are entered it creates the course object annd fills uses the .value to get the values
    const course={}
    const courseName=document.getElementById('courseName').value;
    const courseCredit=document.getElementById('courseCredits').value;
        //I had to parse this to an integer cause the value is always a String. 
    const credit=parseInt(courseCredit)
    const grade=document.getElementById('grade').value;
    //If there is no Course name, Empty Credits, Or a null grade It sends an alert
    if (!courseName || isNaN(credit) || grade=='') {
        alert("Invalid input");
        return;
    }
    //Setting them into the course object.
    course.courseName=courseName;
    course.courseCredit=credit;
    course.courseGrade=grade;
    //This pushes them into the courses array. The console.log was to help me see that it was working,
    courses.push(course)
    console.log("Course Added")
    updateUI();
    //Now this is pretty helpful it helps me see that the course objects are being added to the array
    console.log(courses)
    //This clears the input fields and makes the value in the dropdown value the default
    document.getElementById('courseName').value='';
    document.getElementById('courseCredits').value='';
    document.getElementById('grade').selectedIndex=0;
}
//This displays the courses in the in the div with the Course Details ID.
function renderCourses(){
    //So I made an empty string then used the loop to add in the details of each course
    let courseDetails='';
    for(let i=0;i<courses.length;i++){
        courseDetails+=`
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; background: #2D3748; padding: 1rem; border-radius: 4px; margin: 0.5rem 0;">
                <div>
                    Course Name: ${courses[i].courseName} <br>
                    Course Credits: ${courses[i].courseCredit}<br>
                    Course Grade: ${courses[i].courseGrade}
                </div>
                <button class="deleteBtn" data-index="${i}" style="padding: 0.5rem 1rem; background: #e53e3e; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
            </div>
            `        
    }
    //This adds everything to the div
    document.getElementById('courseDetails').innerHTML=courseDetails;
    
    //Add event listeners to all delete buttons
    const deleteButtons=document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const index=this.getAttribute('data-index');
            courses.splice(index, 1);
            updateUI();
        });
    });
}
//Now this handles the GPA calculation. So yeah basic stuff
function calculateGPA(){
    //Some validation. So if the courses list is empty it throws an errow.
    //Cause in the structure, I'm using an array of objects.
    if (courses.length==0){
        alert("No courses have been added");
        return;
    }
    //Grade Point and Total Credits are initialized in the function call because if it was outside the GPA will be an error.
    let gradePoints=0;
    let totalCredits=0;
    //Simple stuff really
    for(let i=0;i<courses.length;i++){
        gradePoints+=gradeConverter(courses[i].courseGrade)*courses[i].courseCredit;
        totalCredits+=courses[i].courseCredit;
    }
    //More simple stuff.
    gpa=gradePoints/totalCredits;
    //The two fixed is for precision and to keep it professional
    document.getElementById("gpa").innerHTML="<h5>GPA: </h5>"+gpa.toFixed(2);
}
//Added this so that it automatically updates courses
function updateUI() {
    renderCourses();
    calculateGPA();
}

//All these enable the code to work well with react. So yeah I replaced the button onclick with these.
const addCourseButton=document.getElementById("addCourseButton");
addCourseButton.addEventListener("click",addCourse);
const renderCoursesButton=document.getElementById("renderCoursesButton");
renderCoursesButton.addEventListener("click",renderCourses);
const calculateGPAButton=document.getElementById("calculateGPAButton");
calculateGPAButton.addEventListener("click",calculateGPA);
const deleteCourseButton=document.getElementById("deleteCourseButton");
deleteCourseButton.addEventListener("click",deleteCourse);
