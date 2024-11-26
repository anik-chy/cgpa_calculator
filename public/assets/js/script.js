import { motivationalQuotes } from "./quotes.js";

document.addEventListener("DOMContentLoaded", () => {
    let selectedCourses = 0; // Global variable to store the number of selected courses
    // Utility to allow only numeric input
    function restrictToNumbers(input, min = null, max = null) {
        input.addEventListener("input", (e) => {
            let value = e.target.value;

            // Allow only numbers and a single dot
            value = value.replace(/[^0-9.]/g, "");
            if (value.split(".").length > 2) {
                value = value.substring(0, value.lastIndexOf("."));
            }

            // Apply range validation if min/max are provided
            if (value) {
                const numValue = parseFloat(value);
                if (min !== null && numValue < min) {
                    value = min.toString();
                }
                if (max !== null && numValue > max) {
                    value = max.toString();
                }
            }

            e.target.value = value;
        });

        input.addEventListener("keydown", (e) => {
            // Allow essential keys (Backspace, Tab, Arrow keys, etc.)
            const allowedKeys = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
                "Home",
                "End",
            ];
            const isNumeric = /^[0-9.]$/.test(e.key);
            if (!isNumeric && !allowedKeys.includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    // Apply validation to Current CGPA field with a range of 0.0 to 4.3
    const currentCGPAInput = document.getElementById("currentCGPA");
    restrictToNumbers(currentCGPAInput, 0.0, 4.3);

    // Apply general validation to Completed Credits (only positive numbers, no range)
    const completedCreditsInput = document.getElementById("completedCredits");
    restrictToNumbers(completedCreditsInput,0, 160);

    // Utility: Hide the courses section with smooth transition
    function hideCoursesSection(coursesSection) {
        coursesSection.classList.add("opacity-0", "transform", "scale-95");
        return new Promise((resolve) => {
            setTimeout(() => {
                coursesSection.classList.add("hidden");
                resolve(); // Resolve after the transition ends
            }, 500); // Matches the transition duration
        });
    }
    function getMotivationalQuote(cgpa) {
        let range = "";
        if (cgpa >= 4.0 && cgpa <= 4.3) {
            range = "4.0-4.3";
        } else if (cgpa >= 3.5 && cgpa < 4.0) {
            range = "3.5-3.9";
        } else if (cgpa >= 3.0 && cgpa < 3.5) {
            range = "3.0-3.4";
        } else if (cgpa >= 2.5 && cgpa < 3.0) {
            range = "2.5-2.9";
        } else if (cgpa >= 2.0 && cgpa < 2.5) {
            range = "2.0-2.4";
        } else {
            range = "Below 2.0";
        }
    
        const quotes = motivationalQuotes[range];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    // Utility: Show the courses section with smooth transition
    function showCoursesSection(coursesSection) {
        coursesSection.classList.remove("hidden");
        setTimeout(() => {
            coursesSection.classList.remove("opacity-0", "transform", "scale-95");
        }, 50); // Small delay to trigger transition
    }

    // Utility: Highlight the selected tag
    function highlightTag(selectedTag) {
        document.querySelectorAll(".course-tag").forEach((tag) => {
            tag.classList.remove("bg-emerald-500", "hover:bg-emerald-400", "text-white", "font-semibold", "scale-105");
            tag.classList.add("bg-gray-200", "text-gray-700", "hover:bg-gray-300");
        });
        selectedTag.classList.remove("bg-gray-200", "text-gray-700", "hover:bg-gray-300");
        selectedTag.classList.add("bg-emerald-500", "hover:bg-emerald-400", "text-white", "font-semibold", "scale-105");
    }

    // Utility: Generate form fields dynamically
    function generateFields(courseCount, coursesForm) {
        coursesForm.innerHTML = ""; // Clear existing fields
        for (let i = 1; i <= courseCount; i++) {
            coursesForm.innerHTML += `
            <div class="grid grid-cols-2 gap-4">
            <!-- Credit Hours Dropdown -->
                <div class="relative">
                    <label for="credit${i}" class="block font-medium">Credit Hours for Course ${i}:</label>
                    <div class="relative mt-1">
                        <select id="credit${i}" class="appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-600 block w-full border rounded-md px-4 py-2">
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <!-- Dropdown SVG Icon -->
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- GPA Dropdown -->
                <div class="relative">
                    <label for="gpa${i}" class="block font-medium">GPA for Course ${i}:</label>
                    <div class="relative mt-1">
                        <select id="gpa${i}" class="appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-600 block w-full border rounded-md px-4 py-2">
                            <option selected value="0.0">0.0</option>
                            <option value="4.3">4.3</option>
                            <option value="4.0">4.0</option>
                            <option value="3.7">3.7</option>
                            <option value="3.3">3.3</option>
                            <option value="3.0">3.0</option>
                            <option value="2.7">2.7</option>
                            <option value="2.3">2.3</option>
                            <option value="2.0">2.0</option>
                            <option value="1.7">1.7</option>
                            <option value="1.3">1.3</option>
                            <option value="1.0">1.0</option>
                            <option value="0.7">0.7</option>
                        </select>
                        <!-- Dropdown SVG Icon -->
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

                `
        }
    }

    // Event Listener: Handle course tag selection
    document.querySelectorAll(".course-tag").forEach((tag) => {
        tag.addEventListener("click", async (e) => {
            selectedCourses = parseInt(e.target.dataset.courses); // Update global variable
            const coursesSection = document.getElementById("coursesSection");
            const coursesForm = document.getElementById("coursesForm");
            const calculateButton = document.getElementById("calculateCGPA");

            // Highlight the selected tag
            highlightTag(e.target);

            // Smoothly transition between states
            if (!coursesSection.classList.contains("hidden")) {
                await hideCoursesSection(coursesSection); // Wait for the section to hide
            }

            // Generate fields and show the section
            generateFields(selectedCourses, coursesForm);
            showCoursesSection(coursesSection);

            // Show the calculate button
            calculateButton.classList.remove("hidden");
        });
    });

    // Show loading screen and calculate CGPA
    document.getElementById("calculateCGPA").addEventListener("click", () => {
        const currentCGPA = parseFloat(document.getElementById("currentCGPA").value);
        const completedCredits = parseFloat(document.getElementById("completedCredits").value);
        const loadingScreen = document.getElementById("loadingScreen");

        if (!currentCGPA || !completedCredits || currentCGPA < 0 || completedCredits < 0) {
            alert("Please provide valid CGPA and completed credits.");
            return;
        }

        let totalCredits = completedCredits;
        let totalQualityPoints = currentCGPA * completedCredits;

        for (let i = 1; i <= selectedCourses; i++) {
            const creditHours = parseFloat(document.getElementById(`credit${i}`).value);
            const gpa = parseFloat(document.getElementById(`gpa${i}`).value);

            if (!creditHours || creditHours <= 0 || !gpa) {
                alert(`Please provide valid inputs for Course ${i}.`);
                return;
            }

            totalCredits += creditHours;
            totalQualityPoints += creditHours * gpa;
        }

        // Show loading screen
        loadingScreen.classList.remove("hidden");

        setTimeout(() => {
            const newCGPA = (totalQualityPoints / totalCredits).toFixed(2);
            const msg = getMotivationalQuote(newCGPA);
            document.getElementById("msg").innerText= msg;
            document.getElementById("result").innerText = `Your updated CGPA is: ${newCGPA}`;
            loadingScreen.classList.add("hidden");
            document.getElementById("resultModal").classList.remove("hidden");
        }, 800); // Simulated delay
    });

    // Close result modal
    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("resultModal").classList.add("hidden");
    });
});
