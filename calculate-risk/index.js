module.exports = async function (context, req) {
    const { age, weight, height, systolic, diastolic, diseases } = req.body;

    // Placeholder for calculations
    const agePoints = calculateAgePoints(age);
    const bmiPoints = calculateBMIPoints(weight, height);
    const bpPoints = calculateBloodPressurePoints(systolic, diastolic);
    const diseasePoints = calculateDiseasePoints(diseases);
    const totalPoints = agePoints + bmiPoints + bpPoints + diseasePoints;

    const riskCategory = determineRiskCategory(totalPoints);

    context.res = {
        status: 200,
        body: {
            agePoints,
            bmiPoints,
            bpPoints,
            diseasePoints,
            total: totalPoints,
            riskCategory
        }
    };
};

// Calculation Functions (Placeholder)
function calculateAgePoints(age) {
    if (age < 30) return 0;
    if (age < 45) return 10;
    if (age < 60) return 20;
    return 30;
}

function calculateBMIPoints(weight, height) {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    if (bmi >= 18.5 && bmi <= 24.9) return 0;
    if (bmi >= 25.0 && bmi <= 29.9) return 30;
    return 75;
}

function calculateBloodPressurePoints(systolic, diastolic) {
    if (systolic < 120 && diastolic < 80) return 0;
    if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 15;
    if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) return 30;
    if (systolic >= 140 || diastolic >= 90) return 75;
    if (systolic > 180 || diastolic > 120) return 100;
    return 0;
}

function calculateDiseasePoints(diseases) {
    return diseases.length * 10;
}

function determineRiskCategory(totalPoints) {
    if (totalPoints <= 20) return 'Low Risk';
    if (totalPoints <= 50) return 'Moderate Risk';
    if (totalPoints <= 75) return 'High Risk';
    return 'Uninsurable';
}