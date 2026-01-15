let selectedMajor = '';
let courseCount = 0;
const courses = [];

//ASHESI grading scale converter (4.0 scale)
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

//Function to determine honors category based on GPA
function getHonorsCategory(gpa) {
    if (gpa >= 3.85) {
        return "🏆 Summa Cum Laude (My highest boss)";
    } else if (gpa >= 3.70) {
        return "🥈 Magna Cum Laude (You are some Odogwu oo))";
    } else if (gpa >= 3.5) {
        return "🥉 Cum Laude (I look up to you my boss)";
    }
    return "";
}

//Generate dynamic course input fields based on number selected
function generateCourseInputs() {
    const majorSelect = document.getElementById('major');
    const courseCountSelect = document.getElementById('courseCount');
    const courseInputsDiv = document.getElementById('courseInputs');
    const calculateButton = document.getElementById('calculateGPAButton');
    
    selectedMajor = majorSelect.value;
    courseCount = parseInt(courseCountSelect.value);
    
    // Validate selections
    if (!selectedMajor || !courseCount) {
        courseInputsDiv.innerHTML = '';
        calculateButton.style.display = 'none';
        return;
    }
    
    // Clear previous inputs and courses array
    courses.length = 0;
    document.getElementById('gpa').innerHTML = '';
    
    // Generate input fields for each course
    let inputHTML = `<h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: #cbd5e0;">Enter Course Details</h3>`;
    
    for (let i = 0; i < courseCount; i++) {
        inputHTML += `
            <div style="background: #2D3748; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
                <h4 style="margin-bottom: 0.75rem; color: #90cdf4;">Course ${i + 1}</h4>
                
                <label for="courseName${i}">Course Name:</label>
                <input type="text" id="courseName${i}" placeholder="Course Name" style="margin-bottom: 0.75rem;">
                
                <label for="courseCredits${i}">Course Credits:</label>
                <select id="courseCredits${i}" style="margin-bottom: 0.75rem;">
                    <option value="" disabled selected>-- Select Credits --</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                    <option value="5.5">5.5</option>
                    <option value="6">6</option>
                </select>
                
                <label for="grade${i}">Grade:</label>
                <select id="grade${i}" style="margin-bottom: 0.75rem;">
                    <option value="" disabled selected>-- Select a Grade --</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
            </div>
        `;
    }
    
    courseInputsDiv.innerHTML = inputHTML;
    calculateButton.style.display = 'block';
}

//Validate and collect all course data
function validateAndCollectCourses() {
    courses.length = 0; // Clear previous data
    
    for (let i = 0; i < courseCount; i++) {
        const courseName = document.getElementById(`courseName${i}`).value;
        const courseCredit = parseFloat(document.getElementById(`courseCredits${i}`).value);
        const grade = document.getElementById(`grade${i}`).value;
        
        // Validate each course
        if (!courseName || isNaN(courseCredit) || courseCredit < 0.5 || courseCredit > 6 || grade === '') {
            alert(`Course ${i + 1}: Invalid input. Please fill all fields with valid data.`);
            return false;
        }
        
        courses.push({
            courseName: courseName,
            courseCredit: courseCredit,
            courseGrade: grade
        });
    }
    
    return true;
}

//Calculate and display GPA
function calculateGPA() {
    // Validate all inputs
    if (!validateAndCollectCourses()) {
        return;
    }
    
    let gradePoints = 0;
    let totalCredits = 0;
    
    // Calculate grade points
    for (let i = 0; i < courses.length; i++) {
        gradePoints += gradeConverter(courses[i].courseGrade) * courses[i].courseCredit;
        totalCredits += courses[i].courseCredit;
    }
    
    // Calculate GPA
    const gpa = gradePoints / totalCredits;
    const majorName = document.getElementById('major').options[document.getElementById('major').selectedIndex].text;
    const honors = getHonorsCategory(gpa);
    
    // Display result with major information
    let honorsHTML = honors ? `<p style=\"color: #48bb78; margin-top: 1rem; font-weight: bold;\">${honors}</p>` : '';
    
    document.getElementById('gpa').innerHTML = `
        <div style="background: #2D3748; padding: 1.5rem; border-radius: 4px; margin-top: 2rem; text-align: center;">
            <h3 style="color: #90cdf4; margin-bottom: 0.5rem;">📊 Your Results</h3>
            <p style="color: #cbd5e0; margin-bottom: 1rem;">Major: ${majorName}</p>
            <h2 style="color: #48bb78; font-size: 2.5rem; margin: 1rem 0;">GPA: ${gpa.toFixed(2)}</h2>
            <p style="color: #a0aec0; font-size: 0.9rem;">Based on ${courseCount} courses</p>
            ${honorsHTML}
        </div>
    `;
}

// Event listeners
document.getElementById('major').addEventListener('change', generateCourseInputs);
document.getElementById('courseCount').addEventListener('change', generateCourseInputs);
document.getElementById('calculateGPAButton').addEventListener('click', calculateGPA);

