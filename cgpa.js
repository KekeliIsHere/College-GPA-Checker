const semesters = [];

// Add semester data
function addSemester() {
    const semesterName = document.getElementById('semesterName').value;
    const semesterGPA = document.getElementById('semesterGPA').value;
    const semesterCredits = document.getElementById('semesterCredits').value;

    // Validation
    if (!semesterName || isNaN(semesterGPA) || isNaN(semesterCredits) || semesterGPA < 0 || semesterGPA > 4.0 || semesterCredits <= 0) {
        alert("Invalid input. GPA must be between 0 and 4.0, and credits must be greater than 0");
        return;
    }

    const semester = {
        name: semesterName,
        gpa: parseFloat(semesterGPA),
        credits: parseFloat(semesterCredits)
    };

    semesters.push(semester);
    console.log("Semester Added:", semester);
    console.log("All Semesters:", semesters);

    updateCGPAUI();
    clearInputs();
}

// Clear input fields
function clearInputs() {
    document.getElementById('semesterName').value = '';
    document.getElementById('semesterGPA').value = '';
    document.getElementById('semesterCredits').value = '';
}

// Render added semesters
function renderSemesters() {
    let semesterDetails = '';
    for (let i = 0; i < semesters.length; i++) {
        semesterDetails += `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; background: #2D3748; padding: 1rem; border-radius: 4px; margin: 0.5rem 0;">
                <div>
                    <strong>${semesters[i].name}</strong><br>
                    GPA: ${semesters[i].gpa.toFixed(2)} | Credits: ${semesters[i].credits}
                </div>
                <button class="deleteBtn" data-index="${i}" style="padding: 0.5rem 1rem; background: #e53e3e; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
            </div>
        `;
    }

    document.getElementById('semesterDetails').innerHTML = semesterDetails;

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            semesters.splice(index, 1);
            updateCGPAUI();
        });
    });
}

// Calculate Cumulative GPA
function calculateCGPA() {
    if (semesters.length === 0) {
        alert("No semesters have been added");
        return;
    }

    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < semesters.length; i++) {
        totalGradePoints += semesters[i].gpa * semesters[i].credits;
        totalCredits += semesters[i].credits;
    }

    const cgpa = totalGradePoints / totalCredits;
    const honors = getHonorsCategory(cgpa);
    let honorsHTML = honors ? `<p style="color: #48bb78; margin-top: 0.5rem; font-weight: bold;">${honors}</p>` : '';

    document.getElementById("cgpa").innerHTML = "<h5>Cumulative GPA: </h5>" + cgpa.toFixed(2) + honorsHTML;
}

// Function to determine honors category
function getHonorsCategory(gpa) {
    if (gpa >= 3.85) {
        return "🏆 Summa Cum Laude (Highest Honors)";
    } else if (gpa >= 3.70) {
        return "🥈 Magna Cum Laude (High Honors)";
    } else if (gpa >= 3.5) {
        return "🥉 Cum Laude (Honors)";
    }
    return "";
}

// Update UI
function updateCGPAUI() {
    renderSemesters();
    calculateCGPA();
}

// Event listeners
const addSemesterButton = document.getElementById("addSemesterButton");
addSemesterButton.addEventListener("click", addSemester);
