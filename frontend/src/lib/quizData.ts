import type { QuizQuestion } from "@/types";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizQuestionWithTopic = QuizQuestion & { topic: string };

export const QUIZ_BY_SUBJECT: Record<string, QuizQuestionWithTopic[]> = {
  "math": [
    {
      "id": "math-easy-1",
      "question": "What is 6 + 2?",
      "options": [
        "7",
        "9",
        "11",
        "8"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 8",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-2",
      "question": "What is 6 - 2?",
      "options": [
        "9",
        "2",
        "4",
        "6"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 4",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-3",
      "question": "What is 6 × 2?",
      "options": [
        "18",
        "22",
        "10",
        "12"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 12",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-4",
      "question": "What is 12 ÷ 2?",
      "options": [
        "7",
        "8",
        "6",
        "5"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-5",
      "question": "What is 6 + 3?",
      "options": [
        "10",
        "8",
        "12",
        "9"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 9",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-6",
      "question": "What is 6 - 3?",
      "options": [
        "5",
        "8",
        "1",
        "3"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 3",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-7",
      "question": "What is 6 × 3?",
      "options": [
        "15",
        "24",
        "18",
        "28"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 18",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-8",
      "question": "What is 18 ÷ 3?",
      "options": [
        "7",
        "5",
        "6",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-9",
      "question": "What is 6 + 4?",
      "options": [
        "10",
        "9",
        "11",
        "13"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 10",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-10",
      "question": "What is 6 - 4?",
      "options": [
        "0",
        "7",
        "2",
        "4"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 2",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-11",
      "question": "What is 6 × 4?",
      "options": [
        "20",
        "30",
        "34",
        "24"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 24",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-12",
      "question": "What is 24 ÷ 4?",
      "options": [
        "5",
        "8",
        "7",
        "6"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-13",
      "question": "What is 6 + 5?",
      "options": [
        "14",
        "12",
        "11",
        "10"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 11",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-14",
      "question": "What is 6 - 5?",
      "options": [
        "5",
        "6",
        "3",
        "1"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 1",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-15",
      "question": "What is 6 × 5?",
      "options": [
        "30",
        "36",
        "40",
        "25"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 30",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-16",
      "question": "What is 30 ÷ 5?",
      "options": [
        "5",
        "6",
        "8",
        "7"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-17",
      "question": "What is 6 + 6?",
      "options": [
        "13",
        "15",
        "11",
        "12"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 12",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-18",
      "question": "What is 6 - 6?",
      "options": [
        "2",
        "5",
        "0",
        "4"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 0",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-19",
      "question": "What is 6 × 6?",
      "options": [
        "46",
        "30",
        "42",
        "36"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 36",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-20",
      "question": "What is 36 ÷ 6?",
      "options": [
        "6",
        "7",
        "8",
        "5"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-21",
      "question": "What is 6 + 7?",
      "options": [
        "13",
        "12",
        "16",
        "14"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 13",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-22",
      "question": "What is 6 × 7?",
      "options": [
        "42",
        "52",
        "35",
        "48"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 42",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-23",
      "question": "What is 42 ÷ 7?",
      "options": [
        "7",
        "5",
        "8",
        "6"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-24",
      "question": "What is 6 + 8?",
      "options": [
        "13",
        "17",
        "14",
        "15"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 14",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-25",
      "question": "What is 6 × 8?",
      "options": [
        "40",
        "48",
        "54",
        "58"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 48",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-26",
      "question": "What is 48 ÷ 8?",
      "options": [
        "7",
        "5",
        "6",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-27",
      "question": "What is 6 + 9?",
      "options": [
        "18",
        "14",
        "16",
        "15"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 15",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-28",
      "question": "What is 6 × 9?",
      "options": [
        "60",
        "64",
        "54",
        "45"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 54",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-29",
      "question": "What is 54 ÷ 9?",
      "options": [
        "5",
        "7",
        "6",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-30",
      "question": "What is 6 + 10?",
      "options": [
        "16",
        "17",
        "15",
        "19"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 16",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-31",
      "question": "What is 6 × 10?",
      "options": [
        "50",
        "60",
        "70",
        "66"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 60",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-32",
      "question": "What is 60 ÷ 10?",
      "options": [
        "6",
        "5",
        "8",
        "7"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-33",
      "question": "What is 6 + 11?",
      "options": [
        "17",
        "18",
        "16",
        "20"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 17",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-34",
      "question": "What is 6 × 11?",
      "options": [
        "72",
        "76",
        "66",
        "55"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 66",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-35",
      "question": "What is 66 ÷ 11?",
      "options": [
        "7",
        "8",
        "6",
        "5"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-36",
      "question": "What is 7 + 2?",
      "options": [
        "10",
        "8",
        "12",
        "9"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 9",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-37",
      "question": "What is 7 - 2?",
      "options": [
        "7",
        "5",
        "3",
        "10"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 5",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-38",
      "question": "What is 7 × 2?",
      "options": [
        "14",
        "12",
        "21",
        "24"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 14",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-39",
      "question": "What is 14 ÷ 2?",
      "options": [
        "8",
        "7",
        "6",
        "9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 7",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-easy-40",
      "question": "What is 7 + 3?",
      "options": [
        "13",
        "11",
        "9",
        "10"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 10",
      "difficulty": "easy",
      "topic": "Arithmetic"
    },
    {
      "id": "math-medium-41",
      "question": "Find the area of a triangle with base 7 cm and height 8 cm.",
      "options": [
        "31 cm²",
        "56 cm²",
        "28 cm²",
        "15 cm²"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 28 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-42",
      "question": "Solve for x: 6x + 7 = 37",
      "options": [
        "4",
        "6",
        "5",
        "7"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 5",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-43",
      "question": "Find the area of a rectangle with length 10 cm and width 8 cm.",
      "options": [
        "85 cm²",
        "36 cm²",
        "18 cm²",
        "80 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 80 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-44",
      "question": "Using π = 22/7, what is the circumference of a circle with radius 63 cm?",
      "options": [
        "126 cm",
        "396 cm",
        "403 cm",
        "198 cm"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 396 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-45",
      "question": "Find the area of a triangle with base 11 cm and height 12 cm.",
      "options": [
        "132 cm²",
        "66 cm²",
        "69 cm²",
        "23 cm²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 66 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-46",
      "question": "Solve for x: 3x + 11 = 38",
      "options": [
        "8",
        "9",
        "11",
        "10"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 9",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-47",
      "question": "Find the area of a rectangle with length 14 cm and width 12 cm.",
      "options": [
        "173 cm²",
        "52 cm²",
        "26 cm²",
        "168 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 168 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-48",
      "question": "Using π = 22/7, what is the circumference of a circle with radius 91 cm?",
      "options": [
        "286 cm",
        "579 cm",
        "572 cm",
        "182 cm"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 572 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-49",
      "question": "Find the area of a triangle with base 15 cm and height 8 cm.",
      "options": [
        "63 cm²",
        "60 cm²",
        "120 cm²",
        "23 cm²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 60 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-50",
      "question": "Solve for x: 7x + 15 = 43",
      "options": [
        "5",
        "3",
        "6",
        "4"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 4",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-51",
      "question": "Find the area of a rectangle with length 18 cm and width 6 cm.",
      "options": [
        "113 cm²",
        "48 cm²",
        "24 cm²",
        "108 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 108 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-52",
      "question": "Using π = 22/7, what is the circumference of a circle with radius 35 cm?",
      "options": [
        "110 cm",
        "70 cm",
        "227 cm",
        "220 cm"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 220 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-53",
      "question": "Find the area of a triangle with base 19 cm and height 12 cm.",
      "options": [
        "114 cm²",
        "117 cm²",
        "31 cm²",
        "228 cm²"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 114 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-54",
      "question": "Solve for x: 4x + 19 = 51",
      "options": [
        "8",
        "7",
        "10",
        "9"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 8",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-55",
      "question": "Find the area of a rectangle with length 22 cm and width 10 cm.",
      "options": [
        "225 cm²",
        "220 cm²",
        "32 cm²",
        "64 cm²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 220 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-56",
      "question": "For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 63 cm?",
      "options": [
        "396 cm",
        "126 cm",
        "198 cm",
        "403 cm"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 396 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-57",
      "question": "Find the area of a triangle with base 23 cm and height 8 cm.",
      "options": [
        "92 cm²",
        "184 cm²",
        "31 cm²",
        "95 cm²"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 92 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-58",
      "question": "Solve for x: 8x + 23 = 47",
      "options": [
        "4",
        "2",
        "5",
        "3"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 3",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-59",
      "question": "Find the area of a rectangle with length 26 cm and width 4 cm.",
      "options": [
        "30 cm²",
        "109 cm²",
        "60 cm²",
        "104 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 104 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-60",
      "question": "For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 91 cm?",
      "options": [
        "182 cm",
        "572 cm",
        "579 cm",
        "286 cm"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 572 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-61",
      "question": "Find the area of a triangle with base 27 cm and height 12 cm.",
      "options": [
        "324 cm²",
        "39 cm²",
        "165 cm²",
        "162 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 162 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-62",
      "question": "Solve for x: 5x + 27 = 62",
      "options": [
        "9",
        "6",
        "7",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 7",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-63",
      "question": "Find the area of a rectangle with length 30 cm and width 8 cm.",
      "options": [
        "76 cm²",
        "245 cm²",
        "240 cm²",
        "38 cm²"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 240 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-64",
      "question": "For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 35 cm?",
      "options": [
        "220 cm",
        "110 cm",
        "70 cm",
        "227 cm"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 220 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-65",
      "question": "Find the area of a triangle with base 31 cm and height 8 cm.",
      "options": [
        "127 cm²",
        "124 cm²",
        "39 cm²",
        "248 cm²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 124 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-66",
      "question": "Solve for x: 2x + 31 = 35",
      "options": [
        "1",
        "3",
        "2",
        "4"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 2",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-67",
      "question": "Find the area of a rectangle with length 34 cm and width 12 cm.",
      "options": [
        "92 cm²",
        "46 cm²",
        "408 cm²",
        "413 cm²"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 408 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-68",
      "question": "Quiz 68 (Medium Circle) asks: For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 63 cm?",
      "options": [
        "126 cm",
        "198 cm",
        "403 cm",
        "396 cm"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 396 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-69",
      "question": "Find the area of a triangle with base 35 cm and height 12 cm.",
      "options": [
        "210 cm²",
        "213 cm²",
        "420 cm²",
        "47 cm²"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 210 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-70",
      "question": "Solve for x: 6x + 35 = 71",
      "options": [
        "7",
        "6",
        "5",
        "8"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 6",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-71",
      "question": "Find the area of a rectangle with length 38 cm and width 6 cm.",
      "options": [
        "44 cm²",
        "88 cm²",
        "233 cm²",
        "228 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 228 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-72",
      "question": "Quiz 72 (Medium Circle) asks: For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 91 cm?",
      "options": [
        "286 cm",
        "182 cm",
        "572 cm",
        "579 cm"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 572 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-73",
      "question": "Find the area of a triangle with base 39 cm and height 8 cm.",
      "options": [
        "47 cm²",
        "159 cm²",
        "156 cm²",
        "312 cm²"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 156 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-74",
      "question": "Solve for x: 3x + 39 = 42",
      "options": [
        "0",
        "1",
        "3",
        "2"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 1",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-75",
      "question": "Find the area of a rectangle with length 42 cm and width 10 cm.",
      "options": [
        "425 cm²",
        "420 cm²",
        "104 cm²",
        "52 cm²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 420 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-76",
      "question": "Quiz 76 (Medium Circle) asks: For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 35 cm?",
      "options": [
        "227 cm",
        "70 cm",
        "110 cm",
        "220 cm"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 220 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-medium-77",
      "question": "Find the area of a triangle with base 43 cm and height 12 cm.",
      "options": [
        "516 cm²",
        "261 cm²",
        "55 cm²",
        "258 cm²"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 258 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-78",
      "question": "Solve for x: 7x + 43 = 78",
      "options": [
        "6",
        "4",
        "7",
        "5"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 5",
      "difficulty": "medium",
      "topic": "Algebra"
    },
    {
      "id": "math-medium-79",
      "question": "Find the area of a rectangle with length 46 cm and width 4 cm.",
      "options": [
        "184 cm²",
        "50 cm²",
        "100 cm²",
        "189 cm²"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 184 cm²",
      "difficulty": "medium",
      "topic": "Geometry"
    },
    {
      "id": "math-medium-80",
      "question": "Quiz 80 (Medium Circle) asks: For Medium Circle practice, Using π = 22/7, what is the circumference of a circle with radius 63 cm?",
      "options": [
        "403 cm",
        "396 cm",
        "126 cm",
        "198 cm"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 396 cm",
      "difficulty": "medium",
      "topic": "Circle"
    },
    {
      "id": "math-hard-81",
      "question": "What is the hypotenuse squared of a right triangle with legs 4 and 5?",
      "options": [
        "46",
        "41",
        "None of these 3",
        "9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 41",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-82",
      "question": "Find simple interest on Tk 1200 at 7% per year for 2 years.",
      "options": [
        "Tk 168",
        "Tk 1207",
        "Tk 84",
        "Tk 252"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Tk 168",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-83",
      "question": "Factorize: 5x² + 25x",
      "options": [
        "5x(x + 5)",
        "5x²(x + 5)",
        "5(x + 5)",
        "x(5x + 5)"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 5x(x + 5)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-84",
      "question": "If x = 6 and y = 7, what is x² + 2xy + y²?",
      "options": [
        "171",
        "166",
        "169",
        "85"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 169",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-85",
      "question": "What is the hypotenuse squared of a right triangle with legs 8 and 9?",
      "options": [
        "None of these 3",
        "150",
        "145",
        "17"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 145",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-86",
      "question": "Find simple interest on Tk 1600 at 5% per year for 2 years.",
      "options": [
        "Tk 80",
        "Tk 240",
        "Tk 160",
        "Tk 1605"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Tk 160",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-87",
      "question": "Factorize: 4x² + 12x",
      "options": [
        "4(x + 3)",
        "4x(x + 3)",
        "x(4x + 3)",
        "4x²(x + 3)"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 4x(x + 3)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-88",
      "question": "If x = 2 and y = 6, what is x² + 2xy + y²?",
      "options": [
        "40",
        "61",
        "66",
        "64"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 64",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-89",
      "question": "What is the hypotenuse squared of a right triangle with legs 3 and 6?",
      "options": [
        "50",
        "27",
        "45",
        "9"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 45",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-90",
      "question": "Find simple interest on Tk 2000 at 9% per year for 2 years.",
      "options": [
        "Tk 2009",
        "Tk 360",
        "Tk 540",
        "Tk 180"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Tk 360",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-91",
      "question": "Factorize: 3x² + 21x",
      "options": [
        "3x²(x + 7)",
        "3x(x + 7)",
        "x(3x + 7)",
        "3(x + 7)"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 3x(x + 7)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-92",
      "question": "If x = 6 and y = 5, what is x² + 2xy + y²?",
      "options": [
        "118",
        "123",
        "61",
        "121"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 121",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-93",
      "question": "What is the hypotenuse squared of a right triangle with legs 7 and 10?",
      "options": [
        "154",
        "17",
        "149",
        "51"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 149",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-94",
      "question": "Find simple interest on Tk 2400 at 7% per year for 2 years.",
      "options": [
        "Tk 336",
        "Tk 2407",
        "Tk 504",
        "Tk 168"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Tk 336",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-95",
      "question": "Factorize: 2x² + 10x",
      "options": [
        "2x(x + 5)",
        "2x²(x + 5)",
        "x(2x + 5)",
        "2(x + 5)"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 2x(x + 5)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-96",
      "question": "If x = 2 and y = 4, what is x² + 2xy + y²?",
      "options": [
        "38",
        "36",
        "20",
        "33"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 36",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-97",
      "question": "What is the hypotenuse squared of a right triangle with legs 11 and 7?",
      "options": [
        "72",
        "175",
        "18",
        "170"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 170",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-98",
      "question": "Find simple interest on Tk 2800 at 5% per year for 2 years.",
      "options": [
        "Tk 140",
        "Tk 420",
        "Tk 2805",
        "Tk 280"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Tk 280",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-99",
      "question": "Factorize: 6x² + 18x",
      "options": [
        "6x²(x + 3)",
        "6(x + 3)",
        "6x(x + 3)",
        "x(6x + 3)"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 6x(x + 3)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-100",
      "question": "If x = 6 and y = 3, what is x² + 2xy + y²?",
      "options": [
        "83",
        "45",
        "78",
        "81"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 81",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-101",
      "question": "What is the hypotenuse squared of a right triangle with legs 6 and 4?",
      "options": [
        "57",
        "10",
        "52",
        "20"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 52",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-102",
      "question": "Find simple interest on Tk 3200 at 9% per year for 2 years.",
      "options": [
        "Tk 288",
        "Tk 576",
        "Tk 864",
        "Tk 3209"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Tk 576",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-103",
      "question": "Factorize: 5x² + 35x",
      "options": [
        "5(x + 7)",
        "5x(x + 7)",
        "5x²(x + 7)",
        "x(5x + 7)"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 5x(x + 7)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-104",
      "question": "If x = 2 and y = 7, what is x² + 2xy + y²?",
      "options": [
        "83",
        "81",
        "78",
        "53"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 81",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-105",
      "question": "What is the hypotenuse squared of a right triangle with legs 10 and 8?",
      "options": [
        "18",
        "169",
        "36",
        "164"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 164",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-106",
      "question": "Find simple interest on Tk 3600 at 7% per year for 2 years.",
      "options": [
        "Tk 756",
        "Tk 504",
        "Tk 252",
        "Tk 3607"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Tk 504",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-107",
      "question": "Factorize: 4x² + 20x",
      "options": [
        "4x²(x + 5)",
        "4(x + 5)",
        "4x(x + 5)",
        "x(4x + 5)"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 4x(x + 5)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-108",
      "question": "If x = 6 and y = 6, what is x² + 2xy + y²?",
      "options": [
        "146",
        "144",
        "72",
        "141"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 144",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-109",
      "question": "What is the hypotenuse squared of a right triangle with legs 5 and 5?",
      "options": [
        "55",
        "10",
        "0",
        "50"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 50",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-110",
      "question": "Find simple interest on Tk 4000 at 5% per year for 2 years.",
      "options": [
        "Tk 200",
        "Tk 600",
        "Tk 400",
        "Tk 4005"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Tk 400",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-111",
      "question": "Factorize: 3x² + 9x",
      "options": [
        "3x²(x + 3)",
        "3(x + 3)",
        "3x(x + 3)",
        "x(3x + 3)"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 3x(x + 3)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-112",
      "question": "If x = 2 and y = 5, what is x² + 2xy + y²?",
      "options": [
        "49",
        "46",
        "51",
        "29"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 49",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-113",
      "question": "What is the hypotenuse squared of a right triangle with legs 9 and 9?",
      "options": [
        "18",
        "162",
        "0",
        "167"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 162",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-114",
      "question": "Find simple interest on Tk 4400 at 9% per year for 2 years.",
      "options": [
        "Tk 396",
        "Tk 4409",
        "Tk 1188",
        "Tk 792"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Tk 792",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-115",
      "question": "Factorize: 2x² + 14x",
      "options": [
        "x(2x + 7)",
        "2x²(x + 7)",
        "2(x + 7)",
        "2x(x + 7)"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 2x(x + 7)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-116",
      "question": "If x = 6 and y = 4, what is x² + 2xy + y²?",
      "options": [
        "52",
        "102",
        "100",
        "97"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 100",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    },
    {
      "id": "math-hard-117",
      "question": "What is the hypotenuse squared of a right triangle with legs 4 and 6?",
      "options": [
        "57",
        "52",
        "10",
        "20"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 52",
      "difficulty": "hard",
      "topic": "Pythagoras"
    },
    {
      "id": "math-hard-118",
      "question": "Find simple interest on Tk 4800 at 7% per year for 2 years.",
      "options": [
        "Tk 336",
        "Tk 1008",
        "Tk 672",
        "Tk 4807"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Tk 672",
      "difficulty": "hard",
      "topic": "Simple Interest"
    },
    {
      "id": "math-hard-119",
      "question": "Factorize: 6x² + 30x",
      "options": [
        "6x²(x + 5)",
        "x(6x + 5)",
        "6(x + 5)",
        "6x(x + 5)"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 6x(x + 5)",
      "difficulty": "hard",
      "topic": "Factorization"
    },
    {
      "id": "math-hard-120",
      "question": "If x = 2 and y = 3, what is x² + 2xy + y²?",
      "options": [
        "22",
        "27",
        "25",
        "13"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 25",
      "difficulty": "hard",
      "topic": "Algebraic Identity"
    }
  ],
  "physics": [
    {
      "id": "physics-easy-1",
      "question": "What is the SI unit of force?",
      "options": [
        "Watt",
        "Newton",
        "Pascal",
        "Joule"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Newton",
      "difficulty": "easy",
      "topic": "Units"
    },
    {
      "id": "physics-easy-2",
      "question": "What is the SI unit of energy?",
      "options": [
        "Joule",
        "Volt",
        "Watt",
        "Newton"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Joule",
      "difficulty": "easy",
      "topic": "Units"
    },
    {
      "id": "physics-easy-3",
      "question": "What is the SI unit of power?",
      "options": [
        "Joule",
        "Watt",
        "Ampere",
        "Ohm"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Watt",
      "difficulty": "easy",
      "topic": "Units"
    },
    {
      "id": "physics-easy-4",
      "question": "What is the SI unit of electric current?",
      "options": [
        "Volt",
        "Coulomb",
        "Ampere",
        "Ohm"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Ampere",
      "difficulty": "easy",
      "topic": "Electricity"
    },
    {
      "id": "physics-easy-5",
      "question": "What device measures electric current?",
      "options": [
        "Barometer",
        "Voltmeter",
        "Ammeter",
        "Thermometer"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Ammeter",
      "difficulty": "easy",
      "topic": "Electricity"
    },
    {
      "id": "physics-easy-6",
      "question": "What device measures potential difference?",
      "options": [
        "Hydrometer",
        "Calorimeter",
        "Voltmeter",
        "Ammeter"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Voltmeter",
      "difficulty": "easy",
      "topic": "Electricity"
    },
    {
      "id": "physics-easy-7",
      "question": "What is the acceleration due to gravity near Earth?",
      "options": [
        "6.7 m/s²",
        "9.8 m/s²",
        "8.9 m/s²",
        "10.8 m/s²"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 9.8 m/s²",
      "difficulty": "easy",
      "topic": "Motion"
    },
    {
      "id": "physics-easy-8",
      "question": "Which quantity has magnitude and direction?",
      "options": [
        "Ratio",
        "Constant",
        "Vector",
        "Scalar"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Vector",
      "difficulty": "easy",
      "topic": "Basic"
    },
    {
      "id": "physics-easy-9",
      "question": "Speed is a scalar quantity because it has only what?",
      "options": [
        "Magnitude",
        "Charge",
        "Direction",
        "Mass"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Magnitude",
      "difficulty": "easy",
      "topic": "Basic"
    },
    {
      "id": "physics-easy-10",
      "question": "Velocity is different from speed because velocity includes what?",
      "options": [
        "Pressure",
        "Density",
        "Temperature",
        "Direction"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Direction",
      "difficulty": "easy",
      "topic": "Motion"
    },
    {
      "id": "physics-easy-11",
      "question": "What is Newton's first law also called?",
      "options": [
        "Law of inertia",
        "Law of acceleration",
        "Law of action",
        "Law of conservation"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Law of inertia",
      "difficulty": "easy",
      "topic": "Newton Laws"
    },
    {
      "id": "physics-easy-12",
      "question": "What is the unit of frequency?",
      "options": [
        "Tesla",
        "Meter",
        "Joule",
        "Hertz"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Hertz",
      "difficulty": "easy",
      "topic": "Waves"
    },
    {
      "id": "physics-easy-13",
      "question": "Sound cannot travel through what?",
      "options": [
        "Vacuum",
        "Steel",
        "Air",
        "Water"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Vacuum",
      "difficulty": "easy",
      "topic": "Waves"
    },
    {
      "id": "physics-easy-14",
      "question": "Light travels fastest in which medium?",
      "options": [
        "Water",
        "Glass",
        "Diamond",
        "Vacuum"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vacuum",
      "difficulty": "easy",
      "topic": "Optics"
    },
    {
      "id": "physics-easy-15",
      "question": "Which mirror is used as a rear-view mirror?",
      "options": [
        "Convex mirror",
        "Concave mirror",
        "Cylindrical mirror",
        "Plane mirror"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Convex mirror",
      "difficulty": "easy",
      "topic": "Optics"
    },
    {
      "id": "physics-easy-16",
      "question": "Which lens is thicker at the middle?",
      "options": [
        "Concave lens",
        "Convex lens",
        "Plane glass",
        "Prism"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Convex lens",
      "difficulty": "easy",
      "topic": "Optics"
    },
    {
      "id": "physics-easy-17",
      "question": "Which type of energy is stored in a stretched spring?",
      "options": [
        "Kinetic energy",
        "Elastic potential energy",
        "Chemical energy",
        "Sound energy"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Elastic potential energy",
      "difficulty": "easy",
      "topic": "Energy"
    },
    {
      "id": "physics-easy-18",
      "question": "What is the SI unit of pressure?",
      "options": [
        "Tesla",
        "Newton",
        "Pascal",
        "Joule"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Pascal",
      "difficulty": "easy",
      "topic": "Pressure"
    },
    {
      "id": "physics-easy-19",
      "question": "What is the boiling point of water at normal pressure?",
      "options": [
        "0°C",
        "212°C",
        "50°C",
        "100°C"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 100°C",
      "difficulty": "easy",
      "topic": "Heat"
    },
    {
      "id": "physics-easy-20",
      "question": "Heat flows naturally from hot body to what?",
      "options": [
        "Vacuum only",
        "Cold body",
        "Hot body",
        "Equal body"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Cold body",
      "difficulty": "easy",
      "topic": "Heat"
    },
    {
      "id": "physics-easy-21",
      "question": "A body of mass 2 kg accelerates at 1 m/s². What force acts on it?",
      "options": [
        "2 N",
        "3 N",
        "4 N",
        "2.0 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 2 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-22",
      "question": "A body of mass 3 kg accelerates at 2 m/s². What force acts on it?",
      "options": [
        "8 N",
        "5 N",
        "1.5 N",
        "6 N"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 6 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-23",
      "question": "A body of mass 4 kg accelerates at 3 m/s². What force acts on it?",
      "options": [
        "12 N",
        "7 N",
        "14 N",
        "1.3 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 12 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-24",
      "question": "A body of mass 5 kg accelerates at 4 m/s². What force acts on it?",
      "options": [
        "20 N",
        "22 N",
        "9 N",
        "1.2 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 20 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-25",
      "question": "A body of mass 6 kg accelerates at 5 m/s². What force acts on it?",
      "options": [
        "1.2 N",
        "32 N",
        "30 N",
        "11 N"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 30 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-26",
      "question": "A body of mass 7 kg accelerates at 1 m/s². What force acts on it?",
      "options": [
        "8 N",
        "7 N",
        "7.0 N",
        "9 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 7 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-27",
      "question": "A body of mass 8 kg accelerates at 2 m/s². What force acts on it?",
      "options": [
        "18 N",
        "16 N",
        "10 N",
        "4.0 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 16 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-28",
      "question": "A body of mass 9 kg accelerates at 3 m/s². What force acts on it?",
      "options": [
        "29 N",
        "27 N",
        "12 N",
        "3.0 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 27 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-29",
      "question": "A body of mass 10 kg accelerates at 4 m/s². What force acts on it?",
      "options": [
        "40 N",
        "14 N",
        "2.5 N",
        "42 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 40 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-30",
      "question": "A body of mass 11 kg accelerates at 5 m/s². What force acts on it?",
      "options": [
        "55 N",
        "2.2 N",
        "16 N",
        "57 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 55 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-31",
      "question": "A body of mass 12 kg accelerates at 1 m/s². What force acts on it?",
      "options": [
        "12 N",
        "14 N",
        "12.0 N",
        "13 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 12 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-32",
      "question": "A body of mass 13 kg accelerates at 2 m/s². What force acts on it?",
      "options": [
        "28 N",
        "26 N",
        "6.5 N",
        "15 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 26 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-33",
      "question": "A body of mass 14 kg accelerates at 3 m/s². What force acts on it?",
      "options": [
        "42 N",
        "17 N",
        "44 N",
        "4.7 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 42 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-34",
      "question": "A body of mass 15 kg accelerates at 4 m/s². What force acts on it?",
      "options": [
        "3.8 N",
        "19 N",
        "62 N",
        "60 N"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 60 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-35",
      "question": "A body of mass 16 kg accelerates at 5 m/s². What force acts on it?",
      "options": [
        "82 N",
        "3.2 N",
        "80 N",
        "21 N"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 80 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-36",
      "question": "A body of mass 17 kg accelerates at 1 m/s². What force acts on it?",
      "options": [
        "18 N",
        "17.0 N",
        "19 N",
        "17 N"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 17 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-37",
      "question": "A body of mass 18 kg accelerates at 2 m/s². What force acts on it?",
      "options": [
        "20 N",
        "36 N",
        "9.0 N",
        "38 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 36 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-38",
      "question": "A body of mass 19 kg accelerates at 3 m/s². What force acts on it?",
      "options": [
        "6.3 N",
        "57 N",
        "22 N",
        "59 N"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 57 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-39",
      "question": "A body of mass 20 kg accelerates at 4 m/s². What force acts on it?",
      "options": [
        "80 N",
        "5.0 N",
        "24 N",
        "82 N"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 80 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-easy-40",
      "question": "A body of mass 21 kg accelerates at 5 m/s². What force acts on it?",
      "options": [
        "107 N",
        "4.2 N",
        "105 N",
        "26 N"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 105 N",
      "difficulty": "easy",
      "topic": "Force"
    },
    {
      "id": "physics-medium-41",
      "question": "A cyclist covers 50 m in 2 s. What is the speed?",
      "options": [
        "52 m/s",
        "0.04 m/s",
        "100 m/s",
        "25 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 25 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-42",
      "question": "If voltage is 4 V and resistance is 3 Ω, what is the current?",
      "options": [
        "1.33333 A",
        "0.75 A",
        "7 A",
        "12 A"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 1.33333 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-43",
      "question": "A wave has frequency 4 Hz and wavelength 5 m. What is its speed?",
      "options": [
        "9 m/s",
        "21 m/s",
        "1.2 m/s",
        "20 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 20 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-44",
      "question": "What is the potential energy of a 5 kg object at height 6 m? Use g = 9.8 m/s².",
      "options": [
        "49.0 J",
        "58.8 J",
        "30 J",
        "294.0 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 294.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-45",
      "question": "A cyclist covers 90 m in 6 s. What is the speed?",
      "options": [
        "15 m/s",
        "540 m/s",
        "96 m/s",
        "0.07 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 15 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-46",
      "question": "If voltage is 8 V and resistance is 7 Ω, what is the current?",
      "options": [
        "1.14286 A",
        "56 A",
        "15 A",
        "0.88 A"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 1.14286 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-47",
      "question": "A wave has frequency 8 Hz and wavelength 4 m. What is its speed?",
      "options": [
        "0.5 m/s",
        "12 m/s",
        "32 m/s",
        "33 m/s"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 32 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-48",
      "question": "What is the potential energy of a 3 kg object at height 10 m? Use g = 9.8 m/s².",
      "options": [
        "29.4 J",
        "294.0 J",
        "30 J",
        "98.0 J"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 294.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-49",
      "question": "A cyclist covers 130 m in 4 s. What is the speed?",
      "options": [
        "32.5 m/s",
        "520 m/s",
        "0.03 m/s",
        "134 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 32.5 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-50",
      "question": "If voltage is 4 V and resistance is 4 Ω, what is the current?",
      "options": [
        "1 A",
        "8 A",
        "1.00 A",
        "16 A"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 1 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-51",
      "question": "A wave has frequency 3 Hz and wavelength 3 m. What is its speed?",
      "options": [
        "10 m/s",
        "6 m/s",
        "1.0 m/s",
        "9 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 9 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-52",
      "question": "What is the potential energy of a 7 kg object at height 6 m? Use g = 9.8 m/s².",
      "options": [
        "411.6 J",
        "68.6 J",
        "58.8 J",
        "42 J"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 411.6 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-53",
      "question": "A cyclist covers 170 m in 2 s. What is the speed?",
      "options": [
        "340 m/s",
        "85 m/s",
        "0.01 m/s",
        "172 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 85 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-54",
      "question": "If voltage is 8 V and resistance is 8 Ω, what is the current?",
      "options": [
        "1.00 A",
        "16 A",
        "1 A",
        "64 A"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 1 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-55",
      "question": "A wave has frequency 7 Hz and wavelength 7 m. What is its speed?",
      "options": [
        "14 m/s",
        "49 m/s",
        "1.0 m/s",
        "50 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 49 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-56",
      "question": "What is the potential energy of a 5 kg object at height 10 m? Use g = 9.8 m/s².",
      "options": [
        "49.0 J",
        "98.0 J",
        "490.0 J",
        "50 J"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 490.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-57",
      "question": "A cyclist covers 210 m in 6 s. What is the speed?",
      "options": [
        "35 m/s",
        "216 m/s",
        "1260 m/s",
        "0.03 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 35 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-58",
      "question": "If voltage is 4 V and resistance is 5 Ω, what is the current?",
      "options": [
        "20 A",
        "9 A",
        "0.8 A",
        "1.25 A"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 0.8 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-59",
      "question": "A wave has frequency 2 Hz and wavelength 6 m. What is its speed?",
      "options": [
        "3.0 m/s",
        "12 m/s",
        "8 m/s",
        "13 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 12 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-60",
      "question": "What is the potential energy of a 3 kg object at height 6 m? Use g = 9.8 m/s².",
      "options": [
        "29.4 J",
        "176.4 J",
        "18 J",
        "58.8 J"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 176.4 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-61",
      "question": "A cyclist covers 250 m in 4 s. What is the speed?",
      "options": [
        "62.5 m/s",
        "0.02 m/s",
        "1000 m/s",
        "254 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 62.5 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-62",
      "question": "If voltage is 8 V and resistance is 2 Ω, what is the current?",
      "options": [
        "16 A",
        "4 A",
        "10 A",
        "0.25 A"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 4 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-63",
      "question": "A wave has frequency 6 Hz and wavelength 5 m. What is its speed?",
      "options": [
        "0.8 m/s",
        "11 m/s",
        "30 m/s",
        "31 m/s"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 30 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-64",
      "question": "What is the potential energy of a 7 kg object at height 10 m? Use g = 9.8 m/s².",
      "options": [
        "68.6 J",
        "686.0 J",
        "70 J",
        "98.0 J"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 686.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-65",
      "question": "A cyclist covers 290 m in 2 s. What is the speed?",
      "options": [
        "145 m/s",
        "292 m/s",
        "580 m/s",
        "0.01 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 145 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-66",
      "question": "If voltage is 4 V and resistance is 6 Ω, what is the current?",
      "options": [
        "10 A",
        "0.666667 A",
        "1.50 A",
        "24 A"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 0.666667 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-67",
      "question": "A wave has frequency 10 Hz and wavelength 4 m. What is its speed?",
      "options": [
        "0.4 m/s",
        "41 m/s",
        "14 m/s",
        "40 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 40 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-68",
      "question": "For Medium Energy practice, What is the potential energy of a 5 kg object at height 6 m? Use g = 9.8 m/s².",
      "options": [
        "58.8 J",
        "30 J",
        "49.0 J",
        "294.0 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 294.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-69",
      "question": "A cyclist covers 330 m in 6 s. What is the speed?",
      "options": [
        "336 m/s",
        "55 m/s",
        "0.02 m/s",
        "1980 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 55 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-70",
      "question": "If voltage is 8 V and resistance is 3 Ω, what is the current?",
      "options": [
        "0.38 A",
        "11 A",
        "24 A",
        "2.66667 A"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 2.66667 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-71",
      "question": "A wave has frequency 5 Hz and wavelength 3 m. What is its speed?",
      "options": [
        "16 m/s",
        "8 m/s",
        "15 m/s",
        "0.6 m/s"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 15 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-72",
      "question": "For Medium Energy practice, What is the potential energy of a 3 kg object at height 10 m? Use g = 9.8 m/s².",
      "options": [
        "294.0 J",
        "98.0 J",
        "30 J",
        "29.4 J"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 294.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-73",
      "question": "A cyclist covers 370 m in 4 s. What is the speed?",
      "options": [
        "92.5 m/s",
        "0.01 m/s",
        "1480 m/s",
        "374 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 92.5 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-74",
      "question": "If voltage is 4 V and resistance is 7 Ω, what is the current?",
      "options": [
        "11 A",
        "1.75 A",
        "28 A",
        "0.571429 A"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 0.571429 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-75",
      "question": "A wave has frequency 9 Hz and wavelength 7 m. What is its speed?",
      "options": [
        "0.8 m/s",
        "64 m/s",
        "16 m/s",
        "63 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 63 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-76",
      "question": "For Medium Energy practice, What is the potential energy of a 7 kg object at height 6 m? Use g = 9.8 m/s².",
      "options": [
        "42 J",
        "58.8 J",
        "68.6 J",
        "411.6 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 411.6 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-medium-77",
      "question": "A cyclist covers 410 m in 2 s. What is the speed?",
      "options": [
        "820 m/s",
        "412 m/s",
        "0.00 m/s",
        "205 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 205 m/s",
      "difficulty": "medium",
      "topic": "Speed"
    },
    {
      "id": "physics-medium-78",
      "question": "If voltage is 8 V and resistance is 4 Ω, what is the current?",
      "options": [
        "32 A",
        "0.50 A",
        "12 A",
        "2 A"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 2 A",
      "difficulty": "medium",
      "topic": "Ohm's Law"
    },
    {
      "id": "physics-medium-79",
      "question": "A wave has frequency 4 Hz and wavelength 6 m. What is its speed?",
      "options": [
        "1.5 m/s",
        "25 m/s",
        "24 m/s",
        "10 m/s"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 24 m/s",
      "difficulty": "medium",
      "topic": "Waves"
    },
    {
      "id": "physics-medium-80",
      "question": "For Medium Energy practice, What is the potential energy of a 5 kg object at height 10 m? Use g = 9.8 m/s².",
      "options": [
        "50 J",
        "98.0 J",
        "49.0 J",
        "490.0 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 490.0 J",
      "difficulty": "medium",
      "topic": "Energy"
    },
    {
      "id": "physics-hard-81",
      "question": "Using v = u + at, find v when u = 2 m/s, a = 1 m/s², t = 2 s.",
      "options": [
        "4 m/s",
        "5 m/s",
        "0 m/s",
        "None of these 3"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 4 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-82",
      "question": "Find electric power using P = I²R when I = 2 A and R = 3 Ω.",
      "options": [
        "6 W",
        "1.5 W",
        "12 W",
        "5 W"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 12 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-83",
      "question": "A force of 7 N moves an object 4 m in the force direction. What is the work done?",
      "options": [
        "1.75 J",
        "28 J",
        "0.6 J",
        "11 J"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 28 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-84",
      "question": "In a series circuit, what happens to current through each resistor?",
      "options": [
        "It depends only on color",
        "It is different in each resistor",
        "It becomes zero",
        "It remains the same"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-85",
      "question": "Using v = u + at, find v when u = 6 m/s, a = 5 m/s², t = 6 s.",
      "options": [
        "180 m/s",
        "36 m/s",
        "17 m/s",
        "24 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 36 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-86",
      "question": "Find electric power using P = I²R when I = 1 A and R = 7 Ω.",
      "options": [
        "8 W",
        "None of these 3",
        "None of these 2",
        "7 W"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 7 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-87",
      "question": "A force of 11 N moves an object 3 m in the force direction. What is the work done?",
      "options": [
        "0.3 J",
        "14 J",
        "3.66667 J",
        "33 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 33 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-88",
      "question": "For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It becomes zero",
        "It depends only on color",
        "It is different in each resistor",
        "It remains the same"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-89",
      "question": "Using v = u + at, find v when u = 3 m/s, a = 4 m/s², t = 4 s.",
      "options": [
        "19 m/s",
        "48 m/s",
        "13 m/s",
        "11 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 19 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-90",
      "question": "Find electric power using P = I²R when I = 5 A and R = 2 Ω.",
      "options": [
        "0.4 W",
        "10 W",
        "50 W",
        "7 W"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 50 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-91",
      "question": "A force of 8 N moves an object 2 m in the force direction. What is the work done?",
      "options": [
        "0.2 J",
        "4 J",
        "10 J",
        "16 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 16 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-92",
      "question": "Quiz 92 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It depends only on color",
        "It is different in each resistor",
        "It becomes zero",
        "It remains the same"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-93",
      "question": "Using v = u + at, find v when u = 7 m/s, a = 3 m/s², t = 2 s.",
      "options": [
        "42 m/s",
        "13 m/s",
        "12 m/s",
        "-1 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 13 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-94",
      "question": "Find electric power using P = I²R when I = 4 A and R = 6 Ω.",
      "options": [
        "10 W",
        "24 W",
        "96 W",
        "1.5 W"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 96 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-95",
      "question": "A force of 5 N moves an object 6 m in the force direction. What is the work done?",
      "options": [
        "30 J",
        "0.833333 J",
        "11 J",
        "1.2 J"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 30 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-96",
      "question": "Quiz 96 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It depends only on color",
        "It remains the same",
        "It becomes zero",
        "It is different in each resistor"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-97",
      "question": "Using v = u + at, find v when u = 4 m/s, a = 2 m/s², t = 6 s.",
      "options": [
        "8 m/s",
        "12 m/s",
        "48 m/s",
        "16 m/s"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 16 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-98",
      "question": "Find electric power using P = I²R when I = 3 A and R = 10 Ω.",
      "options": [
        "90 W",
        "13 W",
        "3.33333 W",
        "30 W"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 90 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-99",
      "question": "A force of 9 N moves an object 5 m in the force direction. What is the work done?",
      "options": [
        "0.6 J",
        "14 J",
        "45 J",
        "1.8 J"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 45 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-100",
      "question": "Quiz 100 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It depends only on color",
        "It becomes zero",
        "It remains the same",
        "It is different in each resistor"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-101",
      "question": "Using v = u + at, find v when u = 8 m/s, a = 1 m/s², t = 4 s.",
      "options": [
        "12 m/s",
        "13 m/s",
        "-4 m/s",
        "32 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 12 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-102",
      "question": "Find electric power using P = I²R when I = 2 A and R = 5 Ω.",
      "options": [
        "20 W",
        "2.5 W",
        "10 W",
        "7 W"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 20 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-103",
      "question": "A force of 6 N moves an object 4 m in the force direction. What is the work done?",
      "options": [
        "10 J",
        "0.7 J",
        "1.5 J",
        "24 J"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 24 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-104",
      "question": "Quiz 104 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It is different in each resistor",
        "It becomes zero",
        "It depends only on color",
        "It remains the same"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-105",
      "question": "Using v = u + at, find v when u = 5 m/s, a = 5 m/s², t = 2 s.",
      "options": [
        "50 m/s",
        "15 m/s",
        "12 m/s",
        "5 m/s"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 15 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-106",
      "question": "Find electric power using P = I²R when I = 1 A and R = 9 Ω.",
      "options": [
        "9 W",
        "10 W",
        "None of these 2",
        "None of these 3"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 9 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-107",
      "question": "A force of 10 N moves an object 3 m in the force direction. What is the work done?",
      "options": [
        "13 J",
        "3.33333 J",
        "30 J",
        "0.3 J"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 30 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-108",
      "question": "Quiz 108 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It depends only on color",
        "It becomes zero",
        "It remains the same",
        "It is different in each resistor"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-109",
      "question": "Using v = u + at, find v when u = 2 m/s, a = 4 m/s², t = 6 s.",
      "options": [
        "26 m/s",
        "12 m/s",
        "22 m/s",
        "48 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 26 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-110",
      "question": "Find electric power using P = I²R when I = 5 A and R = 4 Ω.",
      "options": [
        "100 W",
        "20 W",
        "9 W",
        "0.8 W"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 100 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-111",
      "question": "A force of 7 N moves an object 2 m in the force direction. What is the work done?",
      "options": [
        "14 J",
        "9 J",
        "3.5 J",
        "0.3 J"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 14 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-112",
      "question": "Quiz 112 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It remains the same",
        "It becomes zero",
        "It depends only on color",
        "It is different in each resistor"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-113",
      "question": "Using v = u + at, find v when u = 6 m/s, a = 3 m/s², t = 4 s.",
      "options": [
        "18 m/s",
        "6 m/s",
        "72 m/s",
        "13 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 18 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-114",
      "question": "Find electric power using P = I²R when I = 4 A and R = 8 Ω.",
      "options": [
        "2 W",
        "12 W",
        "128 W",
        "32 W"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 128 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-115",
      "question": "A force of 11 N moves an object 6 m in the force direction. What is the work done?",
      "options": [
        "17 J",
        "0.5 J",
        "66 J",
        "1.83333 J"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 66 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-116",
      "question": "Quiz 116 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It is different in each resistor",
        "It depends only on color",
        "It remains the same",
        "It becomes zero"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    },
    {
      "id": "physics-hard-117",
      "question": "Using v = u + at, find v when u = 3 m/s, a = 2 m/s², t = 2 s.",
      "options": [
        "7 m/s",
        "12 m/s",
        "None of these 3",
        "1 m/s"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 7 m/s",
      "difficulty": "hard",
      "topic": "Kinematics"
    },
    {
      "id": "physics-hard-118",
      "question": "Find electric power using P = I²R when I = 3 A and R = 3 Ω.",
      "options": [
        "6 W",
        "9 W",
        "1 W",
        "27 W"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 27 W",
      "difficulty": "hard",
      "topic": "Electric Power"
    },
    {
      "id": "physics-hard-119",
      "question": "A force of 8 N moves an object 5 m in the force direction. What is the work done?",
      "options": [
        "1.6 J",
        "40 J",
        "0.6 J",
        "13 J"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 40 J",
      "difficulty": "hard",
      "topic": "Work"
    },
    {
      "id": "physics-hard-120",
      "question": "Quiz 120 (Hard Circuit) asks: For Hard Circuit practice, In a series circuit, what happens to current through each resistor?",
      "options": [
        "It becomes zero",
        "It depends only on color",
        "It remains the same",
        "It is different in each resistor"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: It remains the same",
      "difficulty": "hard",
      "topic": "Circuit"
    }
  ],
  "chemistry": [
    {
      "id": "chemistry-easy-1",
      "question": "What is the chemical symbol of oxygen?",
      "options": [
        "Ox",
        "Om",
        "O",
        "Og"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: O",
      "difficulty": "easy",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-easy-2",
      "question": "What is the chemical symbol of sodium?",
      "options": [
        "S",
        "Na",
        "Sd",
        "So"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Na",
      "difficulty": "easy",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-easy-3",
      "question": "What is the chemical symbol of potassium?",
      "options": [
        "P",
        "Pt",
        "K",
        "Po"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: K",
      "difficulty": "easy",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-easy-4",
      "question": "What is the chemical symbol of iron?",
      "options": [
        "Fe",
        "I",
        "Ir",
        "In"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Fe",
      "difficulty": "easy",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-easy-5",
      "question": "What is the chemical symbol of silver?",
      "options": [
        "Sg",
        "Ag",
        "Si",
        "Au"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Ag",
      "difficulty": "easy",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-easy-6",
      "question": "What is the formula of water?",
      "options": [
        "O₂",
        "NaCl",
        "CO₂",
        "H₂O"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: H₂O",
      "difficulty": "easy",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-easy-7",
      "question": "What is the formula of carbon dioxide?",
      "options": [
        "CaO",
        "CO",
        "C₂O",
        "CO₂"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: CO₂",
      "difficulty": "easy",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-easy-8",
      "question": "What is the formula of common salt?",
      "options": [
        "KCl",
        "NaOH",
        "NaCl",
        "HCl"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: NaCl",
      "difficulty": "easy",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-easy-9",
      "question": "Which gas is needed for burning?",
      "options": [
        "Carbon dioxide",
        "Helium",
        "Oxygen",
        "Nitrogen"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "easy",
      "topic": "Gases"
    },
    {
      "id": "chemistry-easy-10",
      "question": "Which gas turns lime water milky?",
      "options": [
        "Oxygen",
        "Hydrogen",
        "Nitrogen",
        "Carbon dioxide"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "easy",
      "topic": "Gases"
    },
    {
      "id": "chemistry-easy-11",
      "question": "pH less than 7 indicates what?",
      "options": [
        "Basic solution",
        "Acidic solution",
        "Neutral solution",
        "Salt only"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Acidic solution",
      "difficulty": "easy",
      "topic": "pH"
    },
    {
      "id": "chemistry-easy-12",
      "question": "pH greater than 7 indicates what?",
      "options": [
        "Basic solution",
        "Neutral solution",
        "Acidic solution",
        "Pure water"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Basic solution",
      "difficulty": "easy",
      "topic": "pH"
    },
    {
      "id": "chemistry-easy-13",
      "question": "Neutral pH at 25°C is what?",
      "options": [
        "7",
        "0",
        "1",
        "14"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 7",
      "difficulty": "easy",
      "topic": "pH"
    },
    {
      "id": "chemistry-easy-14",
      "question": "What particle has negative charge?",
      "options": [
        "Proton",
        "Electron",
        "Nucleus",
        "Neutron"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Electron",
      "difficulty": "easy",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-easy-15",
      "question": "What particle has positive charge?",
      "options": [
        "Electron",
        "Neutron",
        "Molecule",
        "Proton"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Proton",
      "difficulty": "easy",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-easy-16",
      "question": "What particle has no charge?",
      "options": [
        "Electron",
        "Neutron",
        "Ion",
        "Proton"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Neutron",
      "difficulty": "easy",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-easy-17",
      "question": "Atoms of same element with different mass numbers are called what?",
      "options": [
        "Molecules",
        "Ions",
        "Isotopes",
        "Isobars"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Isotopes",
      "difficulty": "easy",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-easy-18",
      "question": "A substance that speeds up a reaction without being consumed is called what?",
      "options": [
        "Solvent",
        "Reactant",
        "Product",
        "Catalyst"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Catalyst",
      "difficulty": "easy",
      "topic": "Reaction"
    },
    {
      "id": "chemistry-easy-19",
      "question": "Rusting mainly involves iron reacting with oxygen and what?",
      "options": [
        "Water",
        "Argon",
        "Helium",
        "Salt only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Water",
      "difficulty": "easy",
      "topic": "Corrosion"
    },
    {
      "id": "chemistry-easy-20",
      "question": "Which acid is present in vinegar?",
      "options": [
        "Citric acid",
        "Nitric acid",
        "Acetic acid",
        "Sulfuric acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Acetic acid",
      "difficulty": "easy",
      "topic": "Acids"
    },
    {
      "id": "chemistry-easy-21",
      "question": "Which acid is present in lemon?",
      "options": [
        "Citric acid",
        "Acetic acid",
        "Carbonic acid",
        "Hydrochloric acid"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Citric acid",
      "difficulty": "easy",
      "topic": "Acids"
    },
    {
      "id": "chemistry-easy-22",
      "question": "Which base is used in soap making?",
      "options": [
        "Sodium chloride",
        "Calcium carbonate",
        "Sodium hydroxide",
        "Glucose"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sodium hydroxide",
      "difficulty": "easy",
      "topic": "Bases"
    },
    {
      "id": "chemistry-easy-23",
      "question": "Organic compounds mainly contain which element?",
      "options": [
        "Sodium",
        "Carbon",
        "Neon",
        "Iron"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Carbon",
      "difficulty": "easy",
      "topic": "Organic"
    },
    {
      "id": "chemistry-easy-24",
      "question": "Methane formula is what?",
      "options": [
        "C₂H₆",
        "CO₂",
        "CH₄",
        "CH₃OH"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: CH₄",
      "difficulty": "easy",
      "topic": "Organic"
    },
    {
      "id": "chemistry-easy-25",
      "question": "Ethene has which type of carbon-carbon bond?",
      "options": [
        "Triple bond",
        "Double bond",
        "Ionic bond",
        "Single bond"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Double bond",
      "difficulty": "easy",
      "topic": "Organic"
    },
    {
      "id": "chemistry-easy-26",
      "question": "Which separation method is used to separate insoluble solid from liquid?",
      "options": [
        "Distillation",
        "Sublimation",
        "Crystallization",
        "Filtration"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Filtration",
      "difficulty": "easy",
      "topic": "Separation"
    },
    {
      "id": "chemistry-easy-27",
      "question": "Which method separates liquids with different boiling points?",
      "options": [
        "Distillation",
        "Filtration",
        "Magnetism",
        "Sieving"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Distillation",
      "difficulty": "easy",
      "topic": "Separation"
    },
    {
      "id": "chemistry-easy-28",
      "question": "Which process changes solid directly to gas?",
      "options": [
        "Freezing",
        "Condensation",
        "Sublimation",
        "Melting"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sublimation",
      "difficulty": "easy",
      "topic": "States"
    },
    {
      "id": "chemistry-easy-29",
      "question": "Which element is a noble gas?",
      "options": [
        "Neon",
        "Sodium",
        "Calcium",
        "Chlorine"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Neon",
      "difficulty": "easy",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-easy-30",
      "question": "Which group contains alkali metals?",
      "options": [
        "Group 1",
        "Group 17",
        "Group 14",
        "Group 18"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Group 1",
      "difficulty": "easy",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-easy-31",
      "question": "Which group contains halogens?",
      "options": [
        "Group 1",
        "Group 2",
        "Group 17",
        "Group 18"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Group 17",
      "difficulty": "easy",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-easy-32",
      "question": "Which group contains noble gases?",
      "options": [
        "Group 18",
        "Group 1",
        "Group 16",
        "Group 17"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Group 18",
      "difficulty": "easy",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-easy-33",
      "question": "Electrolysis uses what to decompose compounds?",
      "options": [
        "Sunlight",
        "Sound",
        "Electric current",
        "Pressure"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Electric current",
      "difficulty": "easy",
      "topic": "Electrolysis"
    },
    {
      "id": "chemistry-easy-34",
      "question": "An ionic bond forms by transfer of what?",
      "options": [
        "Nuclei",
        "Electrons",
        "Neutrons",
        "Protons"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Electrons",
      "difficulty": "easy",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-easy-35",
      "question": "A covalent bond forms by sharing of what?",
      "options": [
        "Protons",
        "Electrons",
        "Ions only",
        "Neutrons"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Electrons",
      "difficulty": "easy",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-easy-36",
      "question": "What is the formula of ammonia?",
      "options": [
        "NH₃",
        "N₂H₄",
        "NH₄Cl",
        "NO₂"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: NH₃",
      "difficulty": "easy",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-easy-37",
      "question": "What is the formula of sulfuric acid?",
      "options": [
        "H₂CO₃",
        "HCl",
        "H₂SO₄",
        "HNO₃"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: H₂SO₄",
      "difficulty": "easy",
      "topic": "Acids"
    },
    {
      "id": "chemistry-easy-38",
      "question": "What is the formula of hydrochloric acid?",
      "options": [
        "NaCl",
        "H₂SO₄",
        "HCl",
        "H₂O"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: HCl",
      "difficulty": "easy",
      "topic": "Acids"
    },
    {
      "id": "chemistry-easy-39",
      "question": "Which metal is liquid at room temperature?",
      "options": [
        "Mercury",
        "Aluminium",
        "Iron",
        "Copper"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Mercury",
      "difficulty": "easy",
      "topic": "Metals"
    },
    {
      "id": "chemistry-easy-40",
      "question": "Which non-metal is liquid at room temperature?",
      "options": [
        "Chlorine",
        "Bromine",
        "Carbon",
        "Iodine"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Bromine",
      "difficulty": "easy",
      "topic": "Non-metals"
    },
    {
      "id": "chemistry-medium-41",
      "question": "In basic chemistry, What is the chemical symbol of oxygen?",
      "options": [
        "O",
        "Og",
        "Om",
        "Ox"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: O",
      "difficulty": "medium",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-medium-42",
      "question": "In basic chemistry, What is the chemical symbol of sodium?",
      "options": [
        "Na",
        "So",
        "S",
        "Sd"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Na",
      "difficulty": "medium",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-medium-43",
      "question": "In basic chemistry, What is the chemical symbol of potassium?",
      "options": [
        "Pt",
        "Po",
        "P",
        "K"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: K",
      "difficulty": "medium",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-medium-44",
      "question": "In basic chemistry, What is the chemical symbol of iron?",
      "options": [
        "Fe",
        "I",
        "Ir",
        "In"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Fe",
      "difficulty": "medium",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-medium-45",
      "question": "In basic chemistry, What is the chemical symbol of silver?",
      "options": [
        "Sg",
        "Au",
        "Si",
        "Ag"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Ag",
      "difficulty": "medium",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-medium-46",
      "question": "In basic chemistry, What is the formula of water?",
      "options": [
        "NaCl",
        "H₂O",
        "CO₂",
        "O₂"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: H₂O",
      "difficulty": "medium",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-medium-47",
      "question": "In basic chemistry, What is the formula of carbon dioxide?",
      "options": [
        "CO₂",
        "C₂O",
        "CaO",
        "CO"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: CO₂",
      "difficulty": "medium",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-medium-48",
      "question": "In basic chemistry, What is the formula of common salt?",
      "options": [
        "NaCl",
        "KCl",
        "NaOH",
        "HCl"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: NaCl",
      "difficulty": "medium",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-medium-49",
      "question": "In basic chemistry, Which gas is needed for burning?",
      "options": [
        "Carbon dioxide",
        "Nitrogen",
        "Helium",
        "Oxygen"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "medium",
      "topic": "Gases"
    },
    {
      "id": "chemistry-medium-50",
      "question": "In basic chemistry, Which gas turns lime water milky?",
      "options": [
        "Carbon dioxide",
        "Hydrogen",
        "Nitrogen",
        "Oxygen"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "medium",
      "topic": "Gases"
    },
    {
      "id": "chemistry-medium-51",
      "question": "In basic chemistry, pH less than 7 indicates what?",
      "options": [
        "Basic solution",
        "Neutral solution",
        "Acidic solution",
        "Salt only"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Acidic solution",
      "difficulty": "medium",
      "topic": "pH"
    },
    {
      "id": "chemistry-medium-52",
      "question": "In basic chemistry, pH greater than 7 indicates what?",
      "options": [
        "Pure water",
        "Basic solution",
        "Neutral solution",
        "Acidic solution"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Basic solution",
      "difficulty": "medium",
      "topic": "pH"
    },
    {
      "id": "chemistry-medium-53",
      "question": "In basic chemistry, Neutral pH at 25°C is what?",
      "options": [
        "0",
        "7",
        "1",
        "14"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 7",
      "difficulty": "medium",
      "topic": "pH"
    },
    {
      "id": "chemistry-medium-54",
      "question": "In basic chemistry, What particle has negative charge?",
      "options": [
        "Proton",
        "Neutron",
        "Electron",
        "Nucleus"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Electron",
      "difficulty": "medium",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-medium-55",
      "question": "In basic chemistry, What particle has positive charge?",
      "options": [
        "Neutron",
        "Molecule",
        "Electron",
        "Proton"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Proton",
      "difficulty": "medium",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-medium-56",
      "question": "In basic chemistry, What particle has no charge?",
      "options": [
        "Neutron",
        "Proton",
        "Ion",
        "Electron"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Neutron",
      "difficulty": "medium",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-medium-57",
      "question": "In basic chemistry, Atoms of same element with different mass numbers are called what?",
      "options": [
        "Isotopes",
        "Molecules",
        "Isobars",
        "Ions"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Isotopes",
      "difficulty": "medium",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-medium-58",
      "question": "In basic chemistry, A substance that speeds up a reaction without being consumed is called what?",
      "options": [
        "Reactant",
        "Solvent",
        "Catalyst",
        "Product"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Catalyst",
      "difficulty": "medium",
      "topic": "Reaction"
    },
    {
      "id": "chemistry-medium-59",
      "question": "In basic chemistry, Rusting mainly involves iron reacting with oxygen and what?",
      "options": [
        "Argon",
        "Water",
        "Salt only",
        "Helium"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Water",
      "difficulty": "medium",
      "topic": "Corrosion"
    },
    {
      "id": "chemistry-medium-60",
      "question": "In basic chemistry, Which acid is present in vinegar?",
      "options": [
        "Sulfuric acid",
        "Nitric acid",
        "Acetic acid",
        "Citric acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Acetic acid",
      "difficulty": "medium",
      "topic": "Acids"
    },
    {
      "id": "chemistry-medium-61",
      "question": "In basic chemistry, Which acid is present in lemon?",
      "options": [
        "Citric acid",
        "Hydrochloric acid",
        "Acetic acid",
        "Carbonic acid"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Citric acid",
      "difficulty": "medium",
      "topic": "Acids"
    },
    {
      "id": "chemistry-medium-62",
      "question": "In basic chemistry, Which base is used in soap making?",
      "options": [
        "Glucose",
        "Calcium carbonate",
        "Sodium chloride",
        "Sodium hydroxide"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sodium hydroxide",
      "difficulty": "medium",
      "topic": "Bases"
    },
    {
      "id": "chemistry-medium-63",
      "question": "In basic chemistry, Organic compounds mainly contain which element?",
      "options": [
        "Iron",
        "Sodium",
        "Carbon",
        "Neon"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Carbon",
      "difficulty": "medium",
      "topic": "Organic"
    },
    {
      "id": "chemistry-medium-64",
      "question": "In basic chemistry, Methane formula is what?",
      "options": [
        "CH₄",
        "CO₂",
        "C₂H₆",
        "CH₃OH"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: CH₄",
      "difficulty": "medium",
      "topic": "Organic"
    },
    {
      "id": "chemistry-medium-65",
      "question": "In basic chemistry, Ethene has which type of carbon-carbon bond?",
      "options": [
        "Double bond",
        "Triple bond",
        "Single bond",
        "Ionic bond"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Double bond",
      "difficulty": "medium",
      "topic": "Organic"
    },
    {
      "id": "chemistry-medium-66",
      "question": "In basic chemistry, Which separation method is used to separate insoluble solid from liquid?",
      "options": [
        "Crystallization",
        "Filtration",
        "Sublimation",
        "Distillation"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Filtration",
      "difficulty": "medium",
      "topic": "Separation"
    },
    {
      "id": "chemistry-medium-67",
      "question": "In basic chemistry, Which method separates liquids with different boiling points?",
      "options": [
        "Sieving",
        "Filtration",
        "Distillation",
        "Magnetism"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Distillation",
      "difficulty": "medium",
      "topic": "Separation"
    },
    {
      "id": "chemistry-medium-68",
      "question": "In basic chemistry, Which process changes solid directly to gas?",
      "options": [
        "Melting",
        "Freezing",
        "Condensation",
        "Sublimation"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sublimation",
      "difficulty": "medium",
      "topic": "States"
    },
    {
      "id": "chemistry-medium-69",
      "question": "In basic chemistry, Which element is a noble gas?",
      "options": [
        "Chlorine",
        "Neon",
        "Sodium",
        "Calcium"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Neon",
      "difficulty": "medium",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-medium-70",
      "question": "In basic chemistry, Which group contains alkali metals?",
      "options": [
        "Group 17",
        "Group 18",
        "Group 1",
        "Group 14"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Group 1",
      "difficulty": "medium",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-medium-71",
      "question": "In basic chemistry, Which group contains halogens?",
      "options": [
        "Group 18",
        "Group 1",
        "Group 17",
        "Group 2"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Group 17",
      "difficulty": "medium",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-medium-72",
      "question": "In basic chemistry, Which group contains noble gases?",
      "options": [
        "Group 17",
        "Group 1",
        "Group 16",
        "Group 18"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Group 18",
      "difficulty": "medium",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-medium-73",
      "question": "In basic chemistry, Electrolysis uses what to decompose compounds?",
      "options": [
        "Sunlight",
        "Sound",
        "Pressure",
        "Electric current"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electric current",
      "difficulty": "medium",
      "topic": "Electrolysis"
    },
    {
      "id": "chemistry-medium-74",
      "question": "In basic chemistry, An ionic bond forms by transfer of what?",
      "options": [
        "Protons",
        "Electrons",
        "Neutrons",
        "Nuclei"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Electrons",
      "difficulty": "medium",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-medium-75",
      "question": "In basic chemistry, A covalent bond forms by sharing of what?",
      "options": [
        "Ions only",
        "Neutrons",
        "Protons",
        "Electrons"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electrons",
      "difficulty": "medium",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-medium-76",
      "question": "In basic chemistry, What is the formula of ammonia?",
      "options": [
        "NH₃",
        "NO₂",
        "NH₄Cl",
        "N₂H₄"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: NH₃",
      "difficulty": "medium",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-medium-77",
      "question": "In basic chemistry, What is the formula of sulfuric acid?",
      "options": [
        "H₂CO₃",
        "HNO₃",
        "HCl",
        "H₂SO₄"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: H₂SO₄",
      "difficulty": "medium",
      "topic": "Acids"
    },
    {
      "id": "chemistry-medium-78",
      "question": "In basic chemistry, What is the formula of hydrochloric acid?",
      "options": [
        "HCl",
        "H₂SO₄",
        "H₂O",
        "NaCl"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: HCl",
      "difficulty": "medium",
      "topic": "Acids"
    },
    {
      "id": "chemistry-medium-79",
      "question": "In basic chemistry, Which metal is liquid at room temperature?",
      "options": [
        "Iron",
        "Aluminium",
        "Copper",
        "Mercury"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Mercury",
      "difficulty": "medium",
      "topic": "Metals"
    },
    {
      "id": "chemistry-medium-80",
      "question": "In basic chemistry, Which non-metal is liquid at room temperature?",
      "options": [
        "Bromine",
        "Carbon",
        "Iodine",
        "Chlorine"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Bromine",
      "difficulty": "medium",
      "topic": "Non-metals"
    },
    {
      "id": "chemistry-hard-81",
      "question": "For exam-level chemistry, What is the chemical symbol of oxygen?",
      "options": [
        "Om",
        "O",
        "Og",
        "Ox"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: O",
      "difficulty": "hard",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-hard-82",
      "question": "For exam-level chemistry, What is the chemical symbol of sodium?",
      "options": [
        "S",
        "So",
        "Na",
        "Sd"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Na",
      "difficulty": "hard",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-hard-83",
      "question": "For exam-level chemistry, What is the chemical symbol of potassium?",
      "options": [
        "Pt",
        "P",
        "K",
        "Po"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: K",
      "difficulty": "hard",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-hard-84",
      "question": "For exam-level chemistry, What is the chemical symbol of iron?",
      "options": [
        "In",
        "Ir",
        "I",
        "Fe"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Fe",
      "difficulty": "hard",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-hard-85",
      "question": "For exam-level chemistry, What is the chemical symbol of silver?",
      "options": [
        "Au",
        "Sg",
        "Si",
        "Ag"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Ag",
      "difficulty": "hard",
      "topic": "Symbols"
    },
    {
      "id": "chemistry-hard-86",
      "question": "For exam-level chemistry, What is the formula of water?",
      "options": [
        "O₂",
        "H₂O",
        "CO₂",
        "NaCl"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: H₂O",
      "difficulty": "hard",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-hard-87",
      "question": "For exam-level chemistry, What is the formula of carbon dioxide?",
      "options": [
        "CO₂",
        "C₂O",
        "CaO",
        "CO"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: CO₂",
      "difficulty": "hard",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-hard-88",
      "question": "For exam-level chemistry, What is the formula of common salt?",
      "options": [
        "HCl",
        "NaOH",
        "NaCl",
        "KCl"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: NaCl",
      "difficulty": "hard",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-hard-89",
      "question": "For exam-level chemistry, Which gas is needed for burning?",
      "options": [
        "Helium",
        "Nitrogen",
        "Carbon dioxide",
        "Oxygen"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "hard",
      "topic": "Gases"
    },
    {
      "id": "chemistry-hard-90",
      "question": "For exam-level chemistry, Which gas turns lime water milky?",
      "options": [
        "Hydrogen",
        "Carbon dioxide",
        "Nitrogen",
        "Oxygen"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "hard",
      "topic": "Gases"
    },
    {
      "id": "chemistry-hard-91",
      "question": "For exam-level chemistry, pH less than 7 indicates what?",
      "options": [
        "Acidic solution",
        "Neutral solution",
        "Salt only",
        "Basic solution"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Acidic solution",
      "difficulty": "hard",
      "topic": "pH"
    },
    {
      "id": "chemistry-hard-92",
      "question": "For exam-level chemistry, pH greater than 7 indicates what?",
      "options": [
        "Neutral solution",
        "Basic solution",
        "Acidic solution",
        "Pure water"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Basic solution",
      "difficulty": "hard",
      "topic": "pH"
    },
    {
      "id": "chemistry-hard-93",
      "question": "For exam-level chemistry, Neutral pH at 25°C is what?",
      "options": [
        "14",
        "7",
        "0",
        "1"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 7",
      "difficulty": "hard",
      "topic": "pH"
    },
    {
      "id": "chemistry-hard-94",
      "question": "For exam-level chemistry, What particle has negative charge?",
      "options": [
        "Nucleus",
        "Neutron",
        "Proton",
        "Electron"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electron",
      "difficulty": "hard",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-hard-95",
      "question": "For exam-level chemistry, What particle has positive charge?",
      "options": [
        "Proton",
        "Electron",
        "Molecule",
        "Neutron"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Proton",
      "difficulty": "hard",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-hard-96",
      "question": "For exam-level chemistry, What particle has no charge?",
      "options": [
        "Neutron",
        "Ion",
        "Electron",
        "Proton"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Neutron",
      "difficulty": "hard",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-hard-97",
      "question": "For exam-level chemistry, Atoms of same element with different mass numbers are called what?",
      "options": [
        "Isotopes",
        "Ions",
        "Molecules",
        "Isobars"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Isotopes",
      "difficulty": "hard",
      "topic": "Atomic Structure"
    },
    {
      "id": "chemistry-hard-98",
      "question": "For exam-level chemistry, A substance that speeds up a reaction without being consumed is called what?",
      "options": [
        "Reactant",
        "Solvent",
        "Product",
        "Catalyst"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Catalyst",
      "difficulty": "hard",
      "topic": "Reaction"
    },
    {
      "id": "chemistry-hard-99",
      "question": "For exam-level chemistry, Rusting mainly involves iron reacting with oxygen and what?",
      "options": [
        "Water",
        "Helium",
        "Salt only",
        "Argon"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Water",
      "difficulty": "hard",
      "topic": "Corrosion"
    },
    {
      "id": "chemistry-hard-100",
      "question": "For exam-level chemistry, Which acid is present in vinegar?",
      "options": [
        "Nitric acid",
        "Citric acid",
        "Acetic acid",
        "Sulfuric acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Acetic acid",
      "difficulty": "hard",
      "topic": "Acids"
    },
    {
      "id": "chemistry-hard-101",
      "question": "For exam-level chemistry, Which acid is present in lemon?",
      "options": [
        "Acetic acid",
        "Carbonic acid",
        "Citric acid",
        "Hydrochloric acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Citric acid",
      "difficulty": "hard",
      "topic": "Acids"
    },
    {
      "id": "chemistry-hard-102",
      "question": "For exam-level chemistry, Which base is used in soap making?",
      "options": [
        "Calcium carbonate",
        "Sodium hydroxide",
        "Sodium chloride",
        "Glucose"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Sodium hydroxide",
      "difficulty": "hard",
      "topic": "Bases"
    },
    {
      "id": "chemistry-hard-103",
      "question": "For exam-level chemistry, Organic compounds mainly contain which element?",
      "options": [
        "Sodium",
        "Neon",
        "Carbon",
        "Iron"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Carbon",
      "difficulty": "hard",
      "topic": "Organic"
    },
    {
      "id": "chemistry-hard-104",
      "question": "For exam-level chemistry, Methane formula is what?",
      "options": [
        "C₂H₆",
        "CH₄",
        "CH₃OH",
        "CO₂"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: CH₄",
      "difficulty": "hard",
      "topic": "Organic"
    },
    {
      "id": "chemistry-hard-105",
      "question": "For exam-level chemistry, Ethene has which type of carbon-carbon bond?",
      "options": [
        "Single bond",
        "Ionic bond",
        "Triple bond",
        "Double bond"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Double bond",
      "difficulty": "hard",
      "topic": "Organic"
    },
    {
      "id": "chemistry-hard-106",
      "question": "For exam-level chemistry, Which separation method is used to separate insoluble solid from liquid?",
      "options": [
        "Crystallization",
        "Filtration",
        "Distillation",
        "Sublimation"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Filtration",
      "difficulty": "hard",
      "topic": "Separation"
    },
    {
      "id": "chemistry-hard-107",
      "question": "For exam-level chemistry, Which method separates liquids with different boiling points?",
      "options": [
        "Filtration",
        "Distillation",
        "Magnetism",
        "Sieving"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Distillation",
      "difficulty": "hard",
      "topic": "Separation"
    },
    {
      "id": "chemistry-hard-108",
      "question": "For exam-level chemistry, Which process changes solid directly to gas?",
      "options": [
        "Melting",
        "Freezing",
        "Condensation",
        "Sublimation"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sublimation",
      "difficulty": "hard",
      "topic": "States"
    },
    {
      "id": "chemistry-hard-109",
      "question": "For exam-level chemistry, Which element is a noble gas?",
      "options": [
        "Sodium",
        "Chlorine",
        "Neon",
        "Calcium"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Neon",
      "difficulty": "hard",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-hard-110",
      "question": "For exam-level chemistry, Which group contains alkali metals?",
      "options": [
        "Group 1",
        "Group 14",
        "Group 18",
        "Group 17"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Group 1",
      "difficulty": "hard",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-hard-111",
      "question": "For exam-level chemistry, Which group contains halogens?",
      "options": [
        "Group 18",
        "Group 1",
        "Group 17",
        "Group 2"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Group 17",
      "difficulty": "hard",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-hard-112",
      "question": "For exam-level chemistry, Which group contains noble gases?",
      "options": [
        "Group 18",
        "Group 16",
        "Group 1",
        "Group 17"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Group 18",
      "difficulty": "hard",
      "topic": "Periodic Table"
    },
    {
      "id": "chemistry-hard-113",
      "question": "For exam-level chemistry, Electrolysis uses what to decompose compounds?",
      "options": [
        "Pressure",
        "Sound",
        "Sunlight",
        "Electric current"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electric current",
      "difficulty": "hard",
      "topic": "Electrolysis"
    },
    {
      "id": "chemistry-hard-114",
      "question": "For exam-level chemistry, An ionic bond forms by transfer of what?",
      "options": [
        "Neutrons",
        "Nuclei",
        "Electrons",
        "Protons"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Electrons",
      "difficulty": "hard",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-hard-115",
      "question": "For exam-level chemistry, A covalent bond forms by sharing of what?",
      "options": [
        "Ions only",
        "Protons",
        "Electrons",
        "Neutrons"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Electrons",
      "difficulty": "hard",
      "topic": "Bonding"
    },
    {
      "id": "chemistry-hard-116",
      "question": "For exam-level chemistry, What is the formula of ammonia?",
      "options": [
        "N₂H₄",
        "NH₄Cl",
        "NO₂",
        "NH₃"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: NH₃",
      "difficulty": "hard",
      "topic": "Compounds"
    },
    {
      "id": "chemistry-hard-117",
      "question": "For exam-level chemistry, What is the formula of sulfuric acid?",
      "options": [
        "H₂SO₄",
        "HNO₃",
        "HCl",
        "H₂CO₃"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: H₂SO₄",
      "difficulty": "hard",
      "topic": "Acids"
    },
    {
      "id": "chemistry-hard-118",
      "question": "For exam-level chemistry, What is the formula of hydrochloric acid?",
      "options": [
        "HCl",
        "H₂SO₄",
        "NaCl",
        "H₂O"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: HCl",
      "difficulty": "hard",
      "topic": "Acids"
    },
    {
      "id": "chemistry-hard-119",
      "question": "For exam-level chemistry, Which metal is liquid at room temperature?",
      "options": [
        "Iron",
        "Aluminium",
        "Copper",
        "Mercury"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Mercury",
      "difficulty": "hard",
      "topic": "Metals"
    },
    {
      "id": "chemistry-hard-120",
      "question": "For exam-level chemistry, Which non-metal is liquid at room temperature?",
      "options": [
        "Iodine",
        "Chlorine",
        "Bromine",
        "Carbon"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Bromine",
      "difficulty": "hard",
      "topic": "Non-metals"
    }
  ],
  "biology": [
    {
      "id": "biology-easy-1",
      "question": "What is the basic structural and functional unit of life?",
      "options": [
        "Molecule",
        "Cell",
        "Organ",
        "Tissue"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Cell",
      "difficulty": "easy",
      "topic": "Cell"
    },
    {
      "id": "biology-easy-2",
      "question": "Which organelle is called the powerhouse of the cell?",
      "options": [
        "Mitochondria",
        "Ribosome",
        "Nucleus",
        "Golgi body"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Mitochondria",
      "difficulty": "easy",
      "topic": "Cell"
    },
    {
      "id": "biology-easy-3",
      "question": "Which organelle controls cell activities?",
      "options": [
        "Vacuole",
        "Cell wall",
        "Nucleus",
        "Chloroplast"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Nucleus",
      "difficulty": "easy",
      "topic": "Cell"
    },
    {
      "id": "biology-easy-4",
      "question": "Which organelle performs photosynthesis?",
      "options": [
        "Nucleus",
        "Mitochondria",
        "Ribosome",
        "Chloroplast"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Chloroplast",
      "difficulty": "easy",
      "topic": "Plant Cell"
    },
    {
      "id": "biology-easy-5",
      "question": "What pigment gives leaves green color?",
      "options": [
        "Hemoglobin",
        "Melanin",
        "Chlorophyll",
        "Carotene only"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Chlorophyll",
      "difficulty": "easy",
      "topic": "Plant"
    },
    {
      "id": "biology-easy-6",
      "question": "Plants take carbon dioxide through what?",
      "options": [
        "Phloem",
        "Stomata",
        "Xylem",
        "Root hair"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Stomata",
      "difficulty": "easy",
      "topic": "Plant"
    },
    {
      "id": "biology-easy-7",
      "question": "Water is transported in plants by which tissue?",
      "options": [
        "Xylem",
        "Epidermis",
        "Phloem",
        "Cambium"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Xylem",
      "difficulty": "easy",
      "topic": "Plant"
    },
    {
      "id": "biology-easy-8",
      "question": "Food is transported in plants by which tissue?",
      "options": [
        "Xylem",
        "Phloem",
        "Cortex",
        "Root cap"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Phloem",
      "difficulty": "easy",
      "topic": "Plant"
    },
    {
      "id": "biology-easy-9",
      "question": "Human heart has how many chambers?",
      "options": [
        "Two",
        "Four",
        "Three",
        "Five"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Four",
      "difficulty": "easy",
      "topic": "Human Body"
    },
    {
      "id": "biology-easy-10",
      "question": "Which blood cells carry oxygen?",
      "options": [
        "Red blood cells",
        "White blood cells",
        "Platelets",
        "Plasma only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Red blood cells",
      "difficulty": "easy",
      "topic": "Blood"
    },
    {
      "id": "biology-easy-11",
      "question": "Which pigment carries oxygen in blood?",
      "options": [
        "Keratin",
        "Chlorophyll",
        "Hemoglobin",
        "Insulin"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Hemoglobin",
      "difficulty": "easy",
      "topic": "Blood"
    },
    {
      "id": "biology-easy-12",
      "question": "Which organ filters blood and forms urine?",
      "options": [
        "Kidney",
        "Heart",
        "Lung",
        "Liver"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Kidney",
      "difficulty": "easy",
      "topic": "Excretion"
    },
    {
      "id": "biology-easy-13",
      "question": "Which organ pumps blood?",
      "options": [
        "Brain",
        "Heart",
        "Stomach",
        "Lung"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Heart",
      "difficulty": "easy",
      "topic": "Circulation"
    },
    {
      "id": "biology-easy-14",
      "question": "Which organ is mainly responsible for gas exchange?",
      "options": [
        "Lungs",
        "Kidney",
        "Pancreas",
        "Liver"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Lungs",
      "difficulty": "easy",
      "topic": "Respiration"
    },
    {
      "id": "biology-easy-15",
      "question": "Which part of the brain controls balance?",
      "options": [
        "Hypothalamus",
        "Medulla",
        "Cerebrum",
        "Cerebellum"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Cerebellum",
      "difficulty": "easy",
      "topic": "Nervous System"
    },
    {
      "id": "biology-easy-16",
      "question": "Which hormone controls blood sugar by lowering it?",
      "options": [
        "Thyroxine",
        "Growth hormone",
        "Insulin",
        "Adrenaline"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Insulin",
      "difficulty": "easy",
      "topic": "Hormone"
    },
    {
      "id": "biology-easy-17",
      "question": "DNA stands for what?",
      "options": [
        "Dinitrogen acid",
        "Double nutrient acid",
        "Deoxygenated nucleus acid",
        "Deoxyribonucleic acid"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Deoxyribonucleic acid",
      "difficulty": "easy",
      "topic": "Genetics"
    },
    {
      "id": "biology-easy-18",
      "question": "Genes are located on what?",
      "options": [
        "Lysosomes",
        "Ribosomes",
        "Vacuoles",
        "Chromosomes"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Chromosomes",
      "difficulty": "easy",
      "topic": "Genetics"
    },
    {
      "id": "biology-easy-19",
      "question": "A sudden heritable change in DNA is called what?",
      "options": [
        "Pollination",
        "Respiration",
        "Mutation",
        "Adaptation"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mutation",
      "difficulty": "easy",
      "topic": "Genetics"
    },
    {
      "id": "biology-easy-20",
      "question": "The male gamete in humans is called what?",
      "options": [
        "Ovum",
        "Embryo",
        "Zygote",
        "Sperm"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sperm",
      "difficulty": "easy",
      "topic": "Reproduction"
    },
    {
      "id": "biology-easy-21",
      "question": "The female gamete in humans is called what?",
      "options": [
        "Zygote",
        "Placenta",
        "Ovum",
        "Sperm"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Ovum",
      "difficulty": "easy",
      "topic": "Reproduction"
    },
    {
      "id": "biology-easy-22",
      "question": "Fusion of male and female gametes is called what?",
      "options": [
        "Transpiration",
        "Fertilization",
        "Germination",
        "Pollination"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Fertilization",
      "difficulty": "easy",
      "topic": "Reproduction"
    },
    {
      "id": "biology-easy-23",
      "question": "Transfer of pollen to stigma is called what?",
      "options": [
        "Fertilization",
        "Photosynthesis",
        "Pollination",
        "Germination"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Pollination",
      "difficulty": "easy",
      "topic": "Plant Reproduction"
    },
    {
      "id": "biology-easy-24",
      "question": "Which vitamin deficiency causes scurvy?",
      "options": [
        "Vitamin A",
        "Vitamin K",
        "Vitamin C",
        "Vitamin D"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Vitamin C",
      "difficulty": "easy",
      "topic": "Nutrition"
    },
    {
      "id": "biology-easy-25",
      "question": "Which vitamin deficiency causes rickets?",
      "options": [
        "Vitamin C",
        "Vitamin B12",
        "Vitamin E",
        "Vitamin D"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vitamin D",
      "difficulty": "easy",
      "topic": "Nutrition"
    },
    {
      "id": "biology-easy-26",
      "question": "Which nutrient is the main body-building food?",
      "options": [
        "Water",
        "Fat",
        "Protein",
        "Mineral"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Protein",
      "difficulty": "easy",
      "topic": "Nutrition"
    },
    {
      "id": "biology-easy-27",
      "question": "Which disease is caused by Plasmodium?",
      "options": [
        "Cholera",
        "Dengue",
        "Typhoid",
        "Malaria"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Malaria",
      "difficulty": "easy",
      "topic": "Disease"
    },
    {
      "id": "biology-easy-28",
      "question": "Which mosquito spreads dengue?",
      "options": [
        "Culex mosquito",
        "Anopheles mosquito",
        "Housefly",
        "Aedes mosquito"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Aedes mosquito",
      "difficulty": "easy",
      "topic": "Disease"
    },
    {
      "id": "biology-easy-29",
      "question": "Which bacteria commonly causes cholera?",
      "options": [
        "Plasmodium",
        "Aspergillus",
        "HIV",
        "Vibrio cholerae"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vibrio cholerae",
      "difficulty": "easy",
      "topic": "Disease"
    },
    {
      "id": "biology-easy-30",
      "question": "Which kingdom includes bacteria?",
      "options": [
        "Monera",
        "Plantae",
        "Fungi",
        "Animalia"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Monera",
      "difficulty": "easy",
      "topic": "Classification"
    },
    {
      "id": "biology-easy-31",
      "question": "Which kingdom includes mushrooms?",
      "options": [
        "Protista",
        "Plantae",
        "Monera",
        "Fungi"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Fungi",
      "difficulty": "easy",
      "topic": "Classification"
    },
    {
      "id": "biology-easy-32",
      "question": "Which process releases energy from glucose in cells?",
      "options": [
        "Digestion",
        "Photosynthesis",
        "Transpiration",
        "Respiration"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Respiration",
      "difficulty": "easy",
      "topic": "Respiration"
    },
    {
      "id": "biology-easy-33",
      "question": "What is the product of photosynthesis used as food?",
      "options": [
        "Urea",
        "Glucose",
        "Lactic acid",
        "Ammonia"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Glucose",
      "difficulty": "easy",
      "topic": "Photosynthesis"
    },
    {
      "id": "biology-easy-34",
      "question": "Which part of plant absorbs water?",
      "options": [
        "Stem tip",
        "Flower",
        "Leaf blade",
        "Root hair"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Root hair",
      "difficulty": "easy",
      "topic": "Plant"
    },
    {
      "id": "biology-easy-35",
      "question": "Which human organ produces bile?",
      "options": [
        "Pancreas",
        "Liver",
        "Kidney",
        "Stomach"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Liver",
      "difficulty": "easy",
      "topic": "Digestion"
    },
    {
      "id": "biology-easy-36",
      "question": "Where does most digestion and absorption occur?",
      "options": [
        "Small intestine",
        "Large intestine",
        "Mouth",
        "Esophagus"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Small intestine",
      "difficulty": "easy",
      "topic": "Digestion"
    },
    {
      "id": "biology-easy-37",
      "question": "Which enzyme in saliva digests starch?",
      "options": [
        "Lipase",
        "Pepsin",
        "Trypsin",
        "Amylase"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Amylase",
      "difficulty": "easy",
      "topic": "Digestion"
    },
    {
      "id": "biology-easy-38",
      "question": "Which blood component helps clotting?",
      "options": [
        "WBC only",
        "RBC",
        "Platelets",
        "Plasma"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Platelets",
      "difficulty": "easy",
      "topic": "Blood"
    },
    {
      "id": "biology-easy-39",
      "question": "Which part of eye controls amount of light entering?",
      "options": [
        "Iris",
        "Retina",
        "Cornea",
        "Lens"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Iris",
      "difficulty": "easy",
      "topic": "Sense Organ"
    },
    {
      "id": "biology-easy-40",
      "question": "Which part of eye forms image?",
      "options": [
        "Retina",
        "Iris",
        "Pupil",
        "Sclera"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Retina",
      "difficulty": "easy",
      "topic": "Sense Organ"
    },
    {
      "id": "biology-medium-41",
      "question": "In biology, What is the basic structural and functional unit of life?",
      "options": [
        "Cell",
        "Tissue",
        "Organ",
        "Molecule"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cell",
      "difficulty": "medium",
      "topic": "Cell"
    },
    {
      "id": "biology-medium-42",
      "question": "In biology, Which organelle is called the powerhouse of the cell?",
      "options": [
        "Ribosome",
        "Golgi body",
        "Nucleus",
        "Mitochondria"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Mitochondria",
      "difficulty": "medium",
      "topic": "Cell"
    },
    {
      "id": "biology-medium-43",
      "question": "In biology, Which organelle controls cell activities?",
      "options": [
        "Nucleus",
        "Cell wall",
        "Chloroplast",
        "Vacuole"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Nucleus",
      "difficulty": "medium",
      "topic": "Cell"
    },
    {
      "id": "biology-medium-44",
      "question": "In biology, Which organelle performs photosynthesis?",
      "options": [
        "Chloroplast",
        "Nucleus",
        "Ribosome",
        "Mitochondria"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Chloroplast",
      "difficulty": "medium",
      "topic": "Plant Cell"
    },
    {
      "id": "biology-medium-45",
      "question": "In biology, What pigment gives leaves green color?",
      "options": [
        "Chlorophyll",
        "Melanin",
        "Hemoglobin",
        "Carotene only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Chlorophyll",
      "difficulty": "medium",
      "topic": "Plant"
    },
    {
      "id": "biology-medium-46",
      "question": "In biology, Plants take carbon dioxide through what?",
      "options": [
        "Phloem",
        "Xylem",
        "Root hair",
        "Stomata"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Stomata",
      "difficulty": "medium",
      "topic": "Plant"
    },
    {
      "id": "biology-medium-47",
      "question": "In biology, Water is transported in plants by which tissue?",
      "options": [
        "Xylem",
        "Phloem",
        "Cambium",
        "Epidermis"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Xylem",
      "difficulty": "medium",
      "topic": "Plant"
    },
    {
      "id": "biology-medium-48",
      "question": "In biology, Food is transported in plants by which tissue?",
      "options": [
        "Root cap",
        "Xylem",
        "Phloem",
        "Cortex"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Phloem",
      "difficulty": "medium",
      "topic": "Plant"
    },
    {
      "id": "biology-medium-49",
      "question": "In biology, Human heart has how many chambers?",
      "options": [
        "Two",
        "Three",
        "Five",
        "Four"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Four",
      "difficulty": "medium",
      "topic": "Human Body"
    },
    {
      "id": "biology-medium-50",
      "question": "In biology, Which blood cells carry oxygen?",
      "options": [
        "Platelets",
        "Plasma only",
        "White blood cells",
        "Red blood cells"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Red blood cells",
      "difficulty": "medium",
      "topic": "Blood"
    },
    {
      "id": "biology-medium-51",
      "question": "In biology, Which pigment carries oxygen in blood?",
      "options": [
        "Chlorophyll",
        "Keratin",
        "Hemoglobin",
        "Insulin"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Hemoglobin",
      "difficulty": "medium",
      "topic": "Blood"
    },
    {
      "id": "biology-medium-52",
      "question": "In biology, Which organ filters blood and forms urine?",
      "options": [
        "Liver",
        "Kidney",
        "Lung",
        "Heart"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Kidney",
      "difficulty": "medium",
      "topic": "Excretion"
    },
    {
      "id": "biology-medium-53",
      "question": "In biology, Which organ pumps blood?",
      "options": [
        "Heart",
        "Brain",
        "Lung",
        "Stomach"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Heart",
      "difficulty": "medium",
      "topic": "Circulation"
    },
    {
      "id": "biology-medium-54",
      "question": "In biology, Which organ is mainly responsible for gas exchange?",
      "options": [
        "Pancreas",
        "Liver",
        "Kidney",
        "Lungs"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Lungs",
      "difficulty": "medium",
      "topic": "Respiration"
    },
    {
      "id": "biology-medium-55",
      "question": "In biology, Which part of the brain controls balance?",
      "options": [
        "Cerebrum",
        "Hypothalamus",
        "Cerebellum",
        "Medulla"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Cerebellum",
      "difficulty": "medium",
      "topic": "Nervous System"
    },
    {
      "id": "biology-medium-56",
      "question": "In biology, Which hormone controls blood sugar by lowering it?",
      "options": [
        "Insulin",
        "Growth hormone",
        "Thyroxine",
        "Adrenaline"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Insulin",
      "difficulty": "medium",
      "topic": "Hormone"
    },
    {
      "id": "biology-medium-57",
      "question": "In biology, DNA stands for what?",
      "options": [
        "Deoxygenated nucleus acid",
        "Double nutrient acid",
        "Deoxyribonucleic acid",
        "Dinitrogen acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Deoxyribonucleic acid",
      "difficulty": "medium",
      "topic": "Genetics"
    },
    {
      "id": "biology-medium-58",
      "question": "In biology, Genes are located on what?",
      "options": [
        "Vacuoles",
        "Ribosomes",
        "Chromosomes",
        "Lysosomes"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Chromosomes",
      "difficulty": "medium",
      "topic": "Genetics"
    },
    {
      "id": "biology-medium-59",
      "question": "In biology, A sudden heritable change in DNA is called what?",
      "options": [
        "Respiration",
        "Mutation",
        "Pollination",
        "Adaptation"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mutation",
      "difficulty": "medium",
      "topic": "Genetics"
    },
    {
      "id": "biology-medium-60",
      "question": "In biology, The male gamete in humans is called what?",
      "options": [
        "Ovum",
        "Embryo",
        "Sperm",
        "Zygote"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sperm",
      "difficulty": "medium",
      "topic": "Reproduction"
    },
    {
      "id": "biology-medium-61",
      "question": "In biology, The female gamete in humans is called what?",
      "options": [
        "Ovum",
        "Sperm",
        "Placenta",
        "Zygote"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Ovum",
      "difficulty": "medium",
      "topic": "Reproduction"
    },
    {
      "id": "biology-medium-62",
      "question": "In biology, Fusion of male and female gametes is called what?",
      "options": [
        "Transpiration",
        "Fertilization",
        "Pollination",
        "Germination"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Fertilization",
      "difficulty": "medium",
      "topic": "Reproduction"
    },
    {
      "id": "biology-medium-63",
      "question": "In biology, Transfer of pollen to stigma is called what?",
      "options": [
        "Germination",
        "Photosynthesis",
        "Pollination",
        "Fertilization"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Pollination",
      "difficulty": "medium",
      "topic": "Plant Reproduction"
    },
    {
      "id": "biology-medium-64",
      "question": "In biology, Which vitamin deficiency causes scurvy?",
      "options": [
        "Vitamin A",
        "Vitamin D",
        "Vitamin K",
        "Vitamin C"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vitamin C",
      "difficulty": "medium",
      "topic": "Nutrition"
    },
    {
      "id": "biology-medium-65",
      "question": "In biology, Which vitamin deficiency causes rickets?",
      "options": [
        "Vitamin C",
        "Vitamin E",
        "Vitamin B12",
        "Vitamin D"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vitamin D",
      "difficulty": "medium",
      "topic": "Nutrition"
    },
    {
      "id": "biology-medium-66",
      "question": "In biology, Which nutrient is the main body-building food?",
      "options": [
        "Protein",
        "Mineral",
        "Fat",
        "Water"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Protein",
      "difficulty": "medium",
      "topic": "Nutrition"
    },
    {
      "id": "biology-medium-67",
      "question": "In biology, Which disease is caused by Plasmodium?",
      "options": [
        "Typhoid",
        "Dengue",
        "Malaria",
        "Cholera"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Malaria",
      "difficulty": "medium",
      "topic": "Disease"
    },
    {
      "id": "biology-medium-68",
      "question": "In biology, Which mosquito spreads dengue?",
      "options": [
        "Aedes mosquito",
        "Anopheles mosquito",
        "Housefly",
        "Culex mosquito"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Aedes mosquito",
      "difficulty": "medium",
      "topic": "Disease"
    },
    {
      "id": "biology-medium-69",
      "question": "In biology, Which bacteria commonly causes cholera?",
      "options": [
        "Plasmodium",
        "HIV",
        "Aspergillus",
        "Vibrio cholerae"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Vibrio cholerae",
      "difficulty": "medium",
      "topic": "Disease"
    },
    {
      "id": "biology-medium-70",
      "question": "In biology, Which kingdom includes bacteria?",
      "options": [
        "Animalia",
        "Monera",
        "Plantae",
        "Fungi"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Monera",
      "difficulty": "medium",
      "topic": "Classification"
    },
    {
      "id": "biology-medium-71",
      "question": "In biology, Which kingdom includes mushrooms?",
      "options": [
        "Plantae",
        "Protista",
        "Monera",
        "Fungi"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Fungi",
      "difficulty": "medium",
      "topic": "Classification"
    },
    {
      "id": "biology-medium-72",
      "question": "In biology, Which process releases energy from glucose in cells?",
      "options": [
        "Respiration",
        "Transpiration",
        "Photosynthesis",
        "Digestion"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Respiration",
      "difficulty": "medium",
      "topic": "Respiration"
    },
    {
      "id": "biology-medium-73",
      "question": "In biology, What is the product of photosynthesis used as food?",
      "options": [
        "Lactic acid",
        "Glucose",
        "Urea",
        "Ammonia"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Glucose",
      "difficulty": "medium",
      "topic": "Photosynthesis"
    },
    {
      "id": "biology-medium-74",
      "question": "In biology, Which part of plant absorbs water?",
      "options": [
        "Stem tip",
        "Flower",
        "Leaf blade",
        "Root hair"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Root hair",
      "difficulty": "medium",
      "topic": "Plant"
    },
    {
      "id": "biology-medium-75",
      "question": "In biology, Which human organ produces bile?",
      "options": [
        "Stomach",
        "Kidney",
        "Pancreas",
        "Liver"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Liver",
      "difficulty": "medium",
      "topic": "Digestion"
    },
    {
      "id": "biology-medium-76",
      "question": "In biology, Where does most digestion and absorption occur?",
      "options": [
        "Large intestine",
        "Esophagus",
        "Small intestine",
        "Mouth"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Small intestine",
      "difficulty": "medium",
      "topic": "Digestion"
    },
    {
      "id": "biology-medium-77",
      "question": "In biology, Which enzyme in saliva digests starch?",
      "options": [
        "Pepsin",
        "Amylase",
        "Lipase",
        "Trypsin"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Amylase",
      "difficulty": "medium",
      "topic": "Digestion"
    },
    {
      "id": "biology-medium-78",
      "question": "In biology, Which blood component helps clotting?",
      "options": [
        "RBC",
        "Plasma",
        "WBC only",
        "Platelets"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Platelets",
      "difficulty": "medium",
      "topic": "Blood"
    },
    {
      "id": "biology-medium-79",
      "question": "In biology, Which part of eye controls amount of light entering?",
      "options": [
        "Lens",
        "Cornea",
        "Iris",
        "Retina"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Iris",
      "difficulty": "medium",
      "topic": "Sense Organ"
    },
    {
      "id": "biology-medium-80",
      "question": "In biology, Which part of eye forms image?",
      "options": [
        "Sclera",
        "Retina",
        "Iris",
        "Pupil"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Retina",
      "difficulty": "medium",
      "topic": "Sense Organ"
    },
    {
      "id": "biology-hard-81",
      "question": "For exam-level biology, What is the basic structural and functional unit of life?",
      "options": [
        "Molecule",
        "Organ",
        "Tissue",
        "Cell"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Cell",
      "difficulty": "hard",
      "topic": "Cell"
    },
    {
      "id": "biology-hard-82",
      "question": "For exam-level biology, Which organelle is called the powerhouse of the cell?",
      "options": [
        "Nucleus",
        "Golgi body",
        "Mitochondria",
        "Ribosome"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mitochondria",
      "difficulty": "hard",
      "topic": "Cell"
    },
    {
      "id": "biology-hard-83",
      "question": "For exam-level biology, Which organelle controls cell activities?",
      "options": [
        "Nucleus",
        "Chloroplast",
        "Cell wall",
        "Vacuole"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Nucleus",
      "difficulty": "hard",
      "topic": "Cell"
    },
    {
      "id": "biology-hard-84",
      "question": "For exam-level biology, Which organelle performs photosynthesis?",
      "options": [
        "Nucleus",
        "Ribosome",
        "Mitochondria",
        "Chloroplast"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Chloroplast",
      "difficulty": "hard",
      "topic": "Plant Cell"
    },
    {
      "id": "biology-hard-85",
      "question": "For exam-level biology, What pigment gives leaves green color?",
      "options": [
        "Melanin",
        "Hemoglobin",
        "Chlorophyll",
        "Carotene only"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Chlorophyll",
      "difficulty": "hard",
      "topic": "Plant"
    },
    {
      "id": "biology-hard-86",
      "question": "For exam-level biology, Plants take carbon dioxide through what?",
      "options": [
        "Phloem",
        "Xylem",
        "Root hair",
        "Stomata"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Stomata",
      "difficulty": "hard",
      "topic": "Plant"
    },
    {
      "id": "biology-hard-87",
      "question": "For exam-level biology, Water is transported in plants by which tissue?",
      "options": [
        "Xylem",
        "Phloem",
        "Epidermis",
        "Cambium"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Xylem",
      "difficulty": "hard",
      "topic": "Plant"
    },
    {
      "id": "biology-hard-88",
      "question": "For exam-level biology, Food is transported in plants by which tissue?",
      "options": [
        "Root cap",
        "Xylem",
        "Phloem",
        "Cortex"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Phloem",
      "difficulty": "hard",
      "topic": "Plant"
    },
    {
      "id": "biology-hard-89",
      "question": "For exam-level biology, Human heart has how many chambers?",
      "options": [
        "Three",
        "Five",
        "Two",
        "Four"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Four",
      "difficulty": "hard",
      "topic": "Human Body"
    },
    {
      "id": "biology-hard-90",
      "question": "For exam-level biology, Which blood cells carry oxygen?",
      "options": [
        "Red blood cells",
        "White blood cells",
        "Platelets",
        "Plasma only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Red blood cells",
      "difficulty": "hard",
      "topic": "Blood"
    },
    {
      "id": "biology-hard-91",
      "question": "For exam-level biology, Which pigment carries oxygen in blood?",
      "options": [
        "Insulin",
        "Keratin",
        "Chlorophyll",
        "Hemoglobin"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Hemoglobin",
      "difficulty": "hard",
      "topic": "Blood"
    },
    {
      "id": "biology-hard-92",
      "question": "For exam-level biology, Which organ filters blood and forms urine?",
      "options": [
        "Kidney",
        "Heart",
        "Lung",
        "Liver"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Kidney",
      "difficulty": "hard",
      "topic": "Excretion"
    },
    {
      "id": "biology-hard-93",
      "question": "For exam-level biology, Which organ pumps blood?",
      "options": [
        "Stomach",
        "Brain",
        "Lung",
        "Heart"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Heart",
      "difficulty": "hard",
      "topic": "Circulation"
    },
    {
      "id": "biology-hard-94",
      "question": "For exam-level biology, Which organ is mainly responsible for gas exchange?",
      "options": [
        "Pancreas",
        "Kidney",
        "Lungs",
        "Liver"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Lungs",
      "difficulty": "hard",
      "topic": "Respiration"
    },
    {
      "id": "biology-hard-95",
      "question": "For exam-level biology, Which part of the brain controls balance?",
      "options": [
        "Hypothalamus",
        "Medulla",
        "Cerebellum",
        "Cerebrum"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Cerebellum",
      "difficulty": "hard",
      "topic": "Nervous System"
    },
    {
      "id": "biology-hard-96",
      "question": "For exam-level biology, Which hormone controls blood sugar by lowering it?",
      "options": [
        "Insulin",
        "Thyroxine",
        "Growth hormone",
        "Adrenaline"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Insulin",
      "difficulty": "hard",
      "topic": "Hormone"
    },
    {
      "id": "biology-hard-97",
      "question": "For exam-level biology, DNA stands for what?",
      "options": [
        "Double nutrient acid",
        "Deoxygenated nucleus acid",
        "Deoxyribonucleic acid",
        "Dinitrogen acid"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Deoxyribonucleic acid",
      "difficulty": "hard",
      "topic": "Genetics"
    },
    {
      "id": "biology-hard-98",
      "question": "For exam-level biology, Genes are located on what?",
      "options": [
        "Lysosomes",
        "Chromosomes",
        "Vacuoles",
        "Ribosomes"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Chromosomes",
      "difficulty": "hard",
      "topic": "Genetics"
    },
    {
      "id": "biology-hard-99",
      "question": "For exam-level biology, A sudden heritable change in DNA is called what?",
      "options": [
        "Pollination",
        "Mutation",
        "Respiration",
        "Adaptation"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mutation",
      "difficulty": "hard",
      "topic": "Genetics"
    },
    {
      "id": "biology-hard-100",
      "question": "For exam-level biology, The male gamete in humans is called what?",
      "options": [
        "Zygote",
        "Ovum",
        "Embryo",
        "Sperm"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sperm",
      "difficulty": "hard",
      "topic": "Reproduction"
    },
    {
      "id": "biology-hard-101",
      "question": "For exam-level biology, The female gamete in humans is called what?",
      "options": [
        "Ovum",
        "Sperm",
        "Zygote",
        "Placenta"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Ovum",
      "difficulty": "hard",
      "topic": "Reproduction"
    },
    {
      "id": "biology-hard-102",
      "question": "For exam-level biology, Fusion of male and female gametes is called what?",
      "options": [
        "Fertilization",
        "Pollination",
        "Transpiration",
        "Germination"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Fertilization",
      "difficulty": "hard",
      "topic": "Reproduction"
    },
    {
      "id": "biology-hard-103",
      "question": "For exam-level biology, Transfer of pollen to stigma is called what?",
      "options": [
        "Germination",
        "Pollination",
        "Photosynthesis",
        "Fertilization"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Pollination",
      "difficulty": "hard",
      "topic": "Plant Reproduction"
    },
    {
      "id": "biology-hard-104",
      "question": "For exam-level biology, Which vitamin deficiency causes scurvy?",
      "options": [
        "Vitamin C",
        "Vitamin D",
        "Vitamin A",
        "Vitamin K"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Vitamin C",
      "difficulty": "hard",
      "topic": "Nutrition"
    },
    {
      "id": "biology-hard-105",
      "question": "For exam-level biology, Which vitamin deficiency causes rickets?",
      "options": [
        "Vitamin C",
        "Vitamin D",
        "Vitamin E",
        "Vitamin B12"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Vitamin D",
      "difficulty": "hard",
      "topic": "Nutrition"
    },
    {
      "id": "biology-hard-106",
      "question": "For exam-level biology, Which nutrient is the main body-building food?",
      "options": [
        "Fat",
        "Protein",
        "Water",
        "Mineral"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Protein",
      "difficulty": "hard",
      "topic": "Nutrition"
    },
    {
      "id": "biology-hard-107",
      "question": "For exam-level biology, Which disease is caused by Plasmodium?",
      "options": [
        "Malaria",
        "Typhoid",
        "Dengue",
        "Cholera"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Malaria",
      "difficulty": "hard",
      "topic": "Disease"
    },
    {
      "id": "biology-hard-108",
      "question": "For exam-level biology, Which mosquito spreads dengue?",
      "options": [
        "Culex mosquito",
        "Anopheles mosquito",
        "Housefly",
        "Aedes mosquito"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Aedes mosquito",
      "difficulty": "hard",
      "topic": "Disease"
    },
    {
      "id": "biology-hard-109",
      "question": "For exam-level biology, Which bacteria commonly causes cholera?",
      "options": [
        "Plasmodium",
        "Aspergillus",
        "Vibrio cholerae",
        "HIV"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Vibrio cholerae",
      "difficulty": "hard",
      "topic": "Disease"
    },
    {
      "id": "biology-hard-110",
      "question": "For exam-level biology, Which kingdom includes bacteria?",
      "options": [
        "Plantae",
        "Monera",
        "Fungi",
        "Animalia"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Monera",
      "difficulty": "hard",
      "topic": "Classification"
    },
    {
      "id": "biology-hard-111",
      "question": "For exam-level biology, Which kingdom includes mushrooms?",
      "options": [
        "Monera",
        "Fungi",
        "Protista",
        "Plantae"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Fungi",
      "difficulty": "hard",
      "topic": "Classification"
    },
    {
      "id": "biology-hard-112",
      "question": "For exam-level biology, Which process releases energy from glucose in cells?",
      "options": [
        "Respiration",
        "Photosynthesis",
        "Digestion",
        "Transpiration"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Respiration",
      "difficulty": "hard",
      "topic": "Respiration"
    },
    {
      "id": "biology-hard-113",
      "question": "For exam-level biology, What is the product of photosynthesis used as food?",
      "options": [
        "Lactic acid",
        "Ammonia",
        "Glucose",
        "Urea"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Glucose",
      "difficulty": "hard",
      "topic": "Photosynthesis"
    },
    {
      "id": "biology-hard-114",
      "question": "For exam-level biology, Which part of plant absorbs water?",
      "options": [
        "Flower",
        "Stem tip",
        "Leaf blade",
        "Root hair"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Root hair",
      "difficulty": "hard",
      "topic": "Plant"
    },
    {
      "id": "biology-hard-115",
      "question": "For exam-level biology, Which human organ produces bile?",
      "options": [
        "Stomach",
        "Kidney",
        "Liver",
        "Pancreas"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Liver",
      "difficulty": "hard",
      "topic": "Digestion"
    },
    {
      "id": "biology-hard-116",
      "question": "For exam-level biology, Where does most digestion and absorption occur?",
      "options": [
        "Mouth",
        "Small intestine",
        "Large intestine",
        "Esophagus"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Small intestine",
      "difficulty": "hard",
      "topic": "Digestion"
    },
    {
      "id": "biology-hard-117",
      "question": "For exam-level biology, Which enzyme in saliva digests starch?",
      "options": [
        "Amylase",
        "Trypsin",
        "Pepsin",
        "Lipase"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Amylase",
      "difficulty": "hard",
      "topic": "Digestion"
    },
    {
      "id": "biology-hard-118",
      "question": "For exam-level biology, Which blood component helps clotting?",
      "options": [
        "Platelets",
        "RBC",
        "Plasma",
        "WBC only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Platelets",
      "difficulty": "hard",
      "topic": "Blood"
    },
    {
      "id": "biology-hard-119",
      "question": "For exam-level biology, Which part of eye controls amount of light entering?",
      "options": [
        "Cornea",
        "Retina",
        "Lens",
        "Iris"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Iris",
      "difficulty": "hard",
      "topic": "Sense Organ"
    },
    {
      "id": "biology-hard-120",
      "question": "For exam-level biology, Which part of eye forms image?",
      "options": [
        "Pupil",
        "Sclera",
        "Iris",
        "Retina"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Retina",
      "difficulty": "hard",
      "topic": "Sense Organ"
    }
  ],
  "english": [
    {
      "id": "english-easy-1",
      "question": "Choose the correct spelling.",
      "options": [
        "Receive",
        "Receeve",
        "Recieve",
        "Receve"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Receive",
      "difficulty": "easy",
      "topic": "Spelling"
    },
    {
      "id": "english-easy-2",
      "question": "For Easy Spelling practice, Choose the correct spelling.",
      "options": [
        "Necesary",
        "Necessary",
        "Neccesary",
        "Neccessary"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Necessary",
      "difficulty": "easy",
      "topic": "Spelling"
    },
    {
      "id": "english-easy-3",
      "question": "Quiz 3 (Easy Spelling) asks: For Easy Spelling practice, Choose the correct spelling.",
      "options": [
        "Separate",
        "Seprate",
        "Separete",
        "Seperate"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Separate",
      "difficulty": "easy",
      "topic": "Spelling"
    },
    {
      "id": "english-easy-4",
      "question": "Quiz 4 (Easy Spelling) asks: For Easy Spelling practice, Choose the correct spelling.",
      "options": [
        "Enviroment",
        "Environmant",
        "Environment",
        "Enviornment"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Environment",
      "difficulty": "easy",
      "topic": "Spelling"
    },
    {
      "id": "english-easy-5",
      "question": "Quiz 5 (Easy Spelling) asks: For Easy Spelling practice, Choose the correct spelling.",
      "options": [
        "Believe",
        "Beleive",
        "Belieave",
        "Belive"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Believe",
      "difficulty": "easy",
      "topic": "Spelling"
    },
    {
      "id": "english-easy-6",
      "question": "Past tense of 'go' is what?",
      "options": [
        "Goed",
        "Going",
        "Went",
        "Gone"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Went",
      "difficulty": "easy",
      "topic": "Verb"
    },
    {
      "id": "english-easy-7",
      "question": "Past participle of 'write' is what?",
      "options": [
        "Written",
        "Wrote",
        "Writing",
        "Writes"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Written",
      "difficulty": "easy",
      "topic": "Verb"
    },
    {
      "id": "english-easy-8",
      "question": "Plural of 'child' is what?",
      "options": [
        "Childrens",
        "Childes",
        "Childs",
        "Children"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Children",
      "difficulty": "easy",
      "topic": "Noun"
    },
    {
      "id": "english-easy-9",
      "question": "Plural of 'mouse' is what?",
      "options": [
        "Mousees",
        "Mices",
        "Mice",
        "Mouses"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mice",
      "difficulty": "easy",
      "topic": "Noun"
    },
    {
      "id": "english-easy-10",
      "question": "Synonym of 'happy' is what?",
      "options": [
        "Sad",
        "Angry",
        "Joyful",
        "Weak"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Joyful",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-11",
      "question": "Antonym of 'brave' is what?",
      "options": [
        "Fearless",
        "Bold",
        "Cowardly",
        "Courageous"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Cowardly",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-12",
      "question": "Which sentence is correct?",
      "options": [
        "He go to school.",
        "He gone to school.",
        "He goes to school.",
        "He going school."
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: He goes to school.",
      "difficulty": "easy",
      "topic": "Grammar"
    },
    {
      "id": "english-easy-13",
      "question": "Choose the article: I saw ___ owl.",
      "options": [
        "a",
        "an",
        "no article",
        "the only"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: an",
      "difficulty": "easy",
      "topic": "Article"
    },
    {
      "id": "english-easy-14",
      "question": "Choose the article: He is ___ honest man.",
      "options": [
        "a",
        "the only",
        "an",
        "no article"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: an",
      "difficulty": "easy",
      "topic": "Article"
    },
    {
      "id": "english-easy-15",
      "question": "Choose correct preposition: He is good ___ English.",
      "options": [
        "by",
        "at",
        "on",
        "in"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: at",
      "difficulty": "easy",
      "topic": "Preposition"
    },
    {
      "id": "english-easy-16",
      "question": "Choose correct preposition: She depends ___ her parents.",
      "options": [
        "in",
        "at",
        "on",
        "with"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: on",
      "difficulty": "easy",
      "topic": "Preposition"
    },
    {
      "id": "english-easy-17",
      "question": "Identify the adjective in 'The tall boy runs fast'.",
      "options": [
        "boy",
        "tall",
        "fast",
        "runs"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: tall",
      "difficulty": "easy",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-easy-18",
      "question": "Identify the verb in 'Birds fly in the sky'.",
      "options": [
        "fly",
        "Birds",
        "sky",
        "in"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: fly",
      "difficulty": "easy",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-easy-19",
      "question": "Identify the adverb in 'She sings beautifully'.",
      "options": [
        "She",
        "sings",
        "beautifully",
        "song"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: beautifully",
      "difficulty": "easy",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-easy-20",
      "question": "Change voice: 'He writes a letter.'",
      "options": [
        "He is written a letter.",
        "A letter is written by him.",
        "A letter was written by him.",
        "A letter has written by him."
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: A letter is written by him.",
      "difficulty": "easy",
      "topic": "Voice"
    },
    {
      "id": "english-easy-21",
      "question": "Change narration: He said, 'I am ill.'",
      "options": [
        "He said that he was ill.",
        "He said that I am ill.",
        "He said he is ill.",
        "He says he was ill."
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: He said that he was ill.",
      "difficulty": "easy",
      "topic": "Narration"
    },
    {
      "id": "english-easy-22",
      "question": "Correct tense: She ___ reading now.",
      "options": [
        "is",
        "was",
        "are",
        "were"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: is",
      "difficulty": "easy",
      "topic": "Tense"
    },
    {
      "id": "english-easy-23",
      "question": "Correct tense: They ___ football yesterday.",
      "options": [
        "play",
        "plays",
        "played",
        "playing"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: played",
      "difficulty": "easy",
      "topic": "Tense"
    },
    {
      "id": "english-easy-24",
      "question": "Choose modal: You ___ obey your parents.",
      "options": [
        "could not",
        "should",
        "would not",
        "may not"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: should",
      "difficulty": "easy",
      "topic": "Modal"
    },
    {
      "id": "english-easy-25",
      "question": "Find the subject: 'The students are studying.'",
      "options": [
        "studying",
        "The students",
        "are studying",
        "students are"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: The students",
      "difficulty": "easy",
      "topic": "Sentence"
    },
    {
      "id": "english-easy-26",
      "question": "Find the object: 'Rima reads a book.'",
      "options": [
        "reads",
        "book reads",
        "Rima",
        "a book"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: a book",
      "difficulty": "easy",
      "topic": "Sentence"
    },
    {
      "id": "english-easy-27",
      "question": "Choose correct tag: You are a student, ___?",
      "options": [
        "aren't you",
        "don't you",
        "isn't it",
        "are you"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: aren't you",
      "difficulty": "easy",
      "topic": "Tag Question"
    },
    {
      "id": "english-easy-28",
      "question": "Choose correct tag: He can swim, ___?",
      "options": [
        "doesn't he",
        "can't he",
        "isn't he",
        "can he"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: can't he",
      "difficulty": "easy",
      "topic": "Tag Question"
    },
    {
      "id": "english-easy-29",
      "question": "Choose correct degree: This is the ___ river in Bangladesh.",
      "options": [
        "longest",
        "longer",
        "most long",
        "long"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: longest",
      "difficulty": "easy",
      "topic": "Degree"
    },
    {
      "id": "english-easy-30",
      "question": "Choose correct conjunction: I stayed home ___ it was raining.",
      "options": [
        "or",
        "and",
        "but",
        "because"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: because",
      "difficulty": "easy",
      "topic": "Conjunction"
    },
    {
      "id": "english-easy-31",
      "question": "Meaning of 'rapid' is what?",
      "options": [
        "Fast",
        "Slow",
        "Weak",
        "Small"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Fast",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-32",
      "question": "Meaning of 'ancient' is what?",
      "options": [
        "Future",
        "Very old",
        "Young",
        "Modern"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Very old",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-33",
      "question": "Antonym of 'increase' is what?",
      "options": [
        "rise",
        "expand",
        "decrease",
        "grow"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: decrease",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-34",
      "question": "Antonym of 'accept' is what?",
      "options": [
        "agree",
        "receive",
        "refuse",
        "take"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: refuse",
      "difficulty": "easy",
      "topic": "Vocabulary"
    },
    {
      "id": "english-easy-35",
      "question": "Correct form: The news ___ true.",
      "options": [
        "have",
        "were",
        "is",
        "are"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: is",
      "difficulty": "easy",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-easy-36",
      "question": "Correct form: Mathematics ___ my favorite subject.",
      "options": [
        "have",
        "is",
        "are",
        "were"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: is",
      "difficulty": "easy",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-easy-37",
      "question": "Choose the noun: 'Honesty is a virtue.'",
      "options": [
        "a",
        "Honesty",
        "is",
        "virtue is"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Honesty",
      "difficulty": "easy",
      "topic": "Noun"
    },
    {
      "id": "english-easy-38",
      "question": "Choose the pronoun: 'They are playing.'",
      "options": [
        "playing",
        "are",
        "play",
        "They"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: They",
      "difficulty": "easy",
      "topic": "Pronoun"
    },
    {
      "id": "english-easy-39",
      "question": "Choose the correct sentence.",
      "options": [
        "I have did my homework.",
        "I done my homework.",
        "I have done my homework.",
        "I has done my homework."
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: I have done my homework.",
      "difficulty": "easy",
      "topic": "Grammar"
    },
    {
      "id": "english-easy-40",
      "question": "Choose correct comparative form of good.",
      "options": [
        "best",
        "more good",
        "gooder",
        "better"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: better",
      "difficulty": "easy",
      "topic": "Degree"
    },
    {
      "id": "english-medium-41",
      "question": "Grammar practice: Choose the correct spelling.",
      "options": [
        "Recieve",
        "Receve",
        "Receive",
        "Receeve"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Receive",
      "difficulty": "medium",
      "topic": "Spelling"
    },
    {
      "id": "english-medium-42",
      "question": "For Medium Spelling practice, Grammar practice: Choose the correct spelling.",
      "options": [
        "Necessary",
        "Necesary",
        "Neccesary",
        "Neccessary"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Necessary",
      "difficulty": "medium",
      "topic": "Spelling"
    },
    {
      "id": "english-medium-43",
      "question": "Quiz 43 (Medium Spelling) asks: For Medium Spelling practice, Grammar practice: Choose the correct spelling.",
      "options": [
        "Seprate",
        "Seperate",
        "Separete",
        "Separate"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Separate",
      "difficulty": "medium",
      "topic": "Spelling"
    },
    {
      "id": "english-medium-44",
      "question": "Quiz 44 (Medium Spelling) asks: For Medium Spelling practice, Grammar practice: Choose the correct spelling.",
      "options": [
        "Enviroment",
        "Enviornment",
        "Environmant",
        "Environment"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Environment",
      "difficulty": "medium",
      "topic": "Spelling"
    },
    {
      "id": "english-medium-45",
      "question": "Quiz 45 (Medium Spelling) asks: For Medium Spelling practice, Grammar practice: Choose the correct spelling.",
      "options": [
        "Believe",
        "Belive",
        "Belieave",
        "Beleive"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Believe",
      "difficulty": "medium",
      "topic": "Spelling"
    },
    {
      "id": "english-medium-46",
      "question": "Grammar practice: Past tense of 'go' is what?",
      "options": [
        "Going",
        "Goed",
        "Gone",
        "Went"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Went",
      "difficulty": "medium",
      "topic": "Verb"
    },
    {
      "id": "english-medium-47",
      "question": "Grammar practice: Past participle of 'write' is what?",
      "options": [
        "Written",
        "Writes",
        "Writing",
        "Wrote"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Written",
      "difficulty": "medium",
      "topic": "Verb"
    },
    {
      "id": "english-medium-48",
      "question": "Grammar practice: Plural of 'child' is what?",
      "options": [
        "Childrens",
        "Children",
        "Childes",
        "Childs"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Children",
      "difficulty": "medium",
      "topic": "Noun"
    },
    {
      "id": "english-medium-49",
      "question": "Grammar practice: Plural of 'mouse' is what?",
      "options": [
        "Mouses",
        "Mices",
        "Mice",
        "Mousees"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mice",
      "difficulty": "medium",
      "topic": "Noun"
    },
    {
      "id": "english-medium-50",
      "question": "Grammar practice: Synonym of 'happy' is what?",
      "options": [
        "Angry",
        "Joyful",
        "Sad",
        "Weak"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Joyful",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-51",
      "question": "Grammar practice: Antonym of 'brave' is what?",
      "options": [
        "Cowardly",
        "Bold",
        "Courageous",
        "Fearless"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cowardly",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-52",
      "question": "Grammar practice: Which sentence is correct?",
      "options": [
        "He going school.",
        "He gone to school.",
        "He go to school.",
        "He goes to school."
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: He goes to school.",
      "difficulty": "medium",
      "topic": "Grammar"
    },
    {
      "id": "english-medium-53",
      "question": "Grammar practice: Choose the article: I saw ___ owl.",
      "options": [
        "a",
        "no article",
        "an",
        "the only"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: an",
      "difficulty": "medium",
      "topic": "Article"
    },
    {
      "id": "english-medium-54",
      "question": "Grammar practice: Choose the article: He is ___ honest man.",
      "options": [
        "a",
        "no article",
        "an",
        "the only"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: an",
      "difficulty": "medium",
      "topic": "Article"
    },
    {
      "id": "english-medium-55",
      "question": "Grammar practice: Choose correct preposition: He is good ___ English.",
      "options": [
        "at",
        "in",
        "by",
        "on"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: at",
      "difficulty": "medium",
      "topic": "Preposition"
    },
    {
      "id": "english-medium-56",
      "question": "Grammar practice: Choose correct preposition: She depends ___ her parents.",
      "options": [
        "on",
        "with",
        "in",
        "at"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: on",
      "difficulty": "medium",
      "topic": "Preposition"
    },
    {
      "id": "english-medium-57",
      "question": "Grammar practice: Identify the adjective in 'The tall boy runs fast'.",
      "options": [
        "boy",
        "tall",
        "runs",
        "fast"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: tall",
      "difficulty": "medium",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-medium-58",
      "question": "Grammar practice: Identify the verb in 'Birds fly in the sky'.",
      "options": [
        "sky",
        "in",
        "fly",
        "Birds"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: fly",
      "difficulty": "medium",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-medium-59",
      "question": "Grammar practice: Identify the adverb in 'She sings beautifully'.",
      "options": [
        "sings",
        "song",
        "She",
        "beautifully"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: beautifully",
      "difficulty": "medium",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-medium-60",
      "question": "Grammar practice: Change voice: 'He writes a letter.'",
      "options": [
        "A letter was written by him.",
        "A letter has written by him.",
        "He is written a letter.",
        "A letter is written by him."
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: A letter is written by him.",
      "difficulty": "medium",
      "topic": "Voice"
    },
    {
      "id": "english-medium-61",
      "question": "Grammar practice: Change narration: He said, 'I am ill.'",
      "options": [
        "He said that he was ill.",
        "He said he is ill.",
        "He said that I am ill.",
        "He says he was ill."
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: He said that he was ill.",
      "difficulty": "medium",
      "topic": "Narration"
    },
    {
      "id": "english-medium-62",
      "question": "Grammar practice: Correct tense: She ___ reading now.",
      "options": [
        "was",
        "is",
        "are",
        "were"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: is",
      "difficulty": "medium",
      "topic": "Tense"
    },
    {
      "id": "english-medium-63",
      "question": "Grammar practice: Correct tense: They ___ football yesterday.",
      "options": [
        "played",
        "plays",
        "playing",
        "play"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: played",
      "difficulty": "medium",
      "topic": "Tense"
    },
    {
      "id": "english-medium-64",
      "question": "Grammar practice: Choose modal: You ___ obey your parents.",
      "options": [
        "would not",
        "may not",
        "could not",
        "should"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: should",
      "difficulty": "medium",
      "topic": "Modal"
    },
    {
      "id": "english-medium-65",
      "question": "Grammar practice: Find the subject: 'The students are studying.'",
      "options": [
        "students are",
        "are studying",
        "The students",
        "studying"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: The students",
      "difficulty": "medium",
      "topic": "Sentence"
    },
    {
      "id": "english-medium-66",
      "question": "Grammar practice: Find the object: 'Rima reads a book.'",
      "options": [
        "a book",
        "reads",
        "Rima",
        "book reads"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: a book",
      "difficulty": "medium",
      "topic": "Sentence"
    },
    {
      "id": "english-medium-67",
      "question": "Grammar practice: Choose correct tag: You are a student, ___?",
      "options": [
        "don't you",
        "aren't you",
        "are you",
        "isn't it"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: aren't you",
      "difficulty": "medium",
      "topic": "Tag Question"
    },
    {
      "id": "english-medium-68",
      "question": "Grammar practice: Choose correct tag: He can swim, ___?",
      "options": [
        "can't he",
        "can he",
        "doesn't he",
        "isn't he"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: can't he",
      "difficulty": "medium",
      "topic": "Tag Question"
    },
    {
      "id": "english-medium-69",
      "question": "Grammar practice: Choose correct degree: This is the ___ river in Bangladesh.",
      "options": [
        "longest",
        "long",
        "most long",
        "longer"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: longest",
      "difficulty": "medium",
      "topic": "Degree"
    },
    {
      "id": "english-medium-70",
      "question": "Grammar practice: Choose correct conjunction: I stayed home ___ it was raining.",
      "options": [
        "and",
        "but",
        "or",
        "because"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: because",
      "difficulty": "medium",
      "topic": "Conjunction"
    },
    {
      "id": "english-medium-71",
      "question": "Grammar practice: Meaning of 'rapid' is what?",
      "options": [
        "Weak",
        "Small",
        "Slow",
        "Fast"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Fast",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-72",
      "question": "Grammar practice: Meaning of 'ancient' is what?",
      "options": [
        "Young",
        "Very old",
        "Modern",
        "Future"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Very old",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-73",
      "question": "Grammar practice: Antonym of 'increase' is what?",
      "options": [
        "expand",
        "grow",
        "rise",
        "decrease"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: decrease",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-74",
      "question": "Grammar practice: Antonym of 'accept' is what?",
      "options": [
        "refuse",
        "agree",
        "receive",
        "take"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: refuse",
      "difficulty": "medium",
      "topic": "Vocabulary"
    },
    {
      "id": "english-medium-75",
      "question": "Grammar practice: Correct form: The news ___ true.",
      "options": [
        "is",
        "have",
        "were",
        "are"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: is",
      "difficulty": "medium",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-medium-76",
      "question": "Grammar practice: Correct form: Mathematics ___ my favorite subject.",
      "options": [
        "have",
        "is",
        "are",
        "were"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: is",
      "difficulty": "medium",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-medium-77",
      "question": "Grammar practice: Choose the noun: 'Honesty is a virtue.'",
      "options": [
        "Honesty",
        "is",
        "virtue is",
        "a"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Honesty",
      "difficulty": "medium",
      "topic": "Noun"
    },
    {
      "id": "english-medium-78",
      "question": "Grammar practice: Choose the pronoun: 'They are playing.'",
      "options": [
        "are",
        "They",
        "play",
        "playing"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: They",
      "difficulty": "medium",
      "topic": "Pronoun"
    },
    {
      "id": "english-medium-79",
      "question": "Grammar practice: Choose the correct sentence.",
      "options": [
        "I done my homework.",
        "I has done my homework.",
        "I have did my homework.",
        "I have done my homework."
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: I have done my homework.",
      "difficulty": "medium",
      "topic": "Grammar"
    },
    {
      "id": "english-medium-80",
      "question": "Grammar practice: Choose correct comparative form of good.",
      "options": [
        "gooder",
        "better",
        "more good",
        "best"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: better",
      "difficulty": "medium",
      "topic": "Degree"
    },
    {
      "id": "english-hard-81",
      "question": "Exam English: Choose the correct spelling.",
      "options": [
        "Receeve",
        "Recieve",
        "Receve",
        "Receive"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Receive",
      "difficulty": "hard",
      "topic": "Spelling"
    },
    {
      "id": "english-hard-82",
      "question": "For Hard Spelling practice, Exam English: Choose the correct spelling.",
      "options": [
        "Neccessary",
        "Necesary",
        "Neccesary",
        "Necessary"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Necessary",
      "difficulty": "hard",
      "topic": "Spelling"
    },
    {
      "id": "english-hard-83",
      "question": "Quiz 83 (Hard Spelling) asks: For Hard Spelling practice, Exam English: Choose the correct spelling.",
      "options": [
        "Separate",
        "Separete",
        "Seprate",
        "Seperate"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Separate",
      "difficulty": "hard",
      "topic": "Spelling"
    },
    {
      "id": "english-hard-84",
      "question": "Quiz 84 (Hard Spelling) asks: For Hard Spelling practice, Exam English: Choose the correct spelling.",
      "options": [
        "Enviornment",
        "Environment",
        "Enviroment",
        "Environmant"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Environment",
      "difficulty": "hard",
      "topic": "Spelling"
    },
    {
      "id": "english-hard-85",
      "question": "Quiz 85 (Hard Spelling) asks: For Hard Spelling practice, Exam English: Choose the correct spelling.",
      "options": [
        "Believe",
        "Belieave",
        "Belive",
        "Beleive"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Believe",
      "difficulty": "hard",
      "topic": "Spelling"
    },
    {
      "id": "english-hard-86",
      "question": "Exam English: Past tense of 'go' is what?",
      "options": [
        "Went",
        "Going",
        "Goed",
        "Gone"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Went",
      "difficulty": "hard",
      "topic": "Verb"
    },
    {
      "id": "english-hard-87",
      "question": "Exam English: Past participle of 'write' is what?",
      "options": [
        "Wrote",
        "Writes",
        "Writing",
        "Written"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Written",
      "difficulty": "hard",
      "topic": "Verb"
    },
    {
      "id": "english-hard-88",
      "question": "Exam English: Plural of 'child' is what?",
      "options": [
        "Children",
        "Childrens",
        "Childs",
        "Childes"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Children",
      "difficulty": "hard",
      "topic": "Noun"
    },
    {
      "id": "english-hard-89",
      "question": "Exam English: Plural of 'mouse' is what?",
      "options": [
        "Mouses",
        "Mices",
        "Mice",
        "Mousees"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mice",
      "difficulty": "hard",
      "topic": "Noun"
    },
    {
      "id": "english-hard-90",
      "question": "Exam English: Synonym of 'happy' is what?",
      "options": [
        "Sad",
        "Weak",
        "Angry",
        "Joyful"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Joyful",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-91",
      "question": "Exam English: Antonym of 'brave' is what?",
      "options": [
        "Cowardly",
        "Courageous",
        "Bold",
        "Fearless"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cowardly",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-92",
      "question": "Exam English: Which sentence is correct?",
      "options": [
        "He gone to school.",
        "He going school.",
        "He go to school.",
        "He goes to school."
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: He goes to school.",
      "difficulty": "hard",
      "topic": "Grammar"
    },
    {
      "id": "english-hard-93",
      "question": "Exam English: Choose the article: I saw ___ owl.",
      "options": [
        "the only",
        "a",
        "an",
        "no article"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: an",
      "difficulty": "hard",
      "topic": "Article"
    },
    {
      "id": "english-hard-94",
      "question": "Exam English: Choose the article: He is ___ honest man.",
      "options": [
        "a",
        "the only",
        "an",
        "no article"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: an",
      "difficulty": "hard",
      "topic": "Article"
    },
    {
      "id": "english-hard-95",
      "question": "Exam English: Choose correct preposition: He is good ___ English.",
      "options": [
        "on",
        "by",
        "at",
        "in"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: at",
      "difficulty": "hard",
      "topic": "Preposition"
    },
    {
      "id": "english-hard-96",
      "question": "Exam English: Choose correct preposition: She depends ___ her parents.",
      "options": [
        "on",
        "with",
        "in",
        "at"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: on",
      "difficulty": "hard",
      "topic": "Preposition"
    },
    {
      "id": "english-hard-97",
      "question": "Exam English: Identify the adjective in 'The tall boy runs fast'.",
      "options": [
        "fast",
        "boy",
        "runs",
        "tall"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: tall",
      "difficulty": "hard",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-hard-98",
      "question": "Exam English: Identify the verb in 'Birds fly in the sky'.",
      "options": [
        "Birds",
        "fly",
        "in",
        "sky"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: fly",
      "difficulty": "hard",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-hard-99",
      "question": "Exam English: Identify the adverb in 'She sings beautifully'.",
      "options": [
        "song",
        "beautifully",
        "She",
        "sings"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: beautifully",
      "difficulty": "hard",
      "topic": "Parts of Speech"
    },
    {
      "id": "english-hard-100",
      "question": "Exam English: Change voice: 'He writes a letter.'",
      "options": [
        "A letter has written by him.",
        "A letter is written by him.",
        "He is written a letter.",
        "A letter was written by him."
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: A letter is written by him.",
      "difficulty": "hard",
      "topic": "Voice"
    },
    {
      "id": "english-hard-101",
      "question": "Exam English: Change narration: He said, 'I am ill.'",
      "options": [
        "He said that I am ill.",
        "He says he was ill.",
        "He said he is ill.",
        "He said that he was ill."
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: He said that he was ill.",
      "difficulty": "hard",
      "topic": "Narration"
    },
    {
      "id": "english-hard-102",
      "question": "Exam English: Correct tense: She ___ reading now.",
      "options": [
        "was",
        "is",
        "were",
        "are"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: is",
      "difficulty": "hard",
      "topic": "Tense"
    },
    {
      "id": "english-hard-103",
      "question": "Exam English: Correct tense: They ___ football yesterday.",
      "options": [
        "played",
        "play",
        "playing",
        "plays"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: played",
      "difficulty": "hard",
      "topic": "Tense"
    },
    {
      "id": "english-hard-104",
      "question": "Exam English: Choose modal: You ___ obey your parents.",
      "options": [
        "may not",
        "should",
        "could not",
        "would not"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: should",
      "difficulty": "hard",
      "topic": "Modal"
    },
    {
      "id": "english-hard-105",
      "question": "Exam English: Find the subject: 'The students are studying.'",
      "options": [
        "studying",
        "are studying",
        "students are",
        "The students"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: The students",
      "difficulty": "hard",
      "topic": "Sentence"
    },
    {
      "id": "english-hard-106",
      "question": "Exam English: Find the object: 'Rima reads a book.'",
      "options": [
        "a book",
        "Rima",
        "reads",
        "book reads"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: a book",
      "difficulty": "hard",
      "topic": "Sentence"
    },
    {
      "id": "english-hard-107",
      "question": "Exam English: Choose correct tag: You are a student, ___?",
      "options": [
        "don't you",
        "aren't you",
        "are you",
        "isn't it"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: aren't you",
      "difficulty": "hard",
      "topic": "Tag Question"
    },
    {
      "id": "english-hard-108",
      "question": "Exam English: Choose correct tag: He can swim, ___?",
      "options": [
        "doesn't he",
        "can't he",
        "isn't he",
        "can he"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: can't he",
      "difficulty": "hard",
      "topic": "Tag Question"
    },
    {
      "id": "english-hard-109",
      "question": "Exam English: Choose correct degree: This is the ___ river in Bangladesh.",
      "options": [
        "longest",
        "longer",
        "long",
        "most long"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: longest",
      "difficulty": "hard",
      "topic": "Degree"
    },
    {
      "id": "english-hard-110",
      "question": "Exam English: Choose correct conjunction: I stayed home ___ it was raining.",
      "options": [
        "and",
        "because",
        "or",
        "but"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: because",
      "difficulty": "hard",
      "topic": "Conjunction"
    },
    {
      "id": "english-hard-111",
      "question": "Exam English: Meaning of 'rapid' is what?",
      "options": [
        "Weak",
        "Fast",
        "Small",
        "Slow"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Fast",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-112",
      "question": "Exam English: Meaning of 'ancient' is what?",
      "options": [
        "Modern",
        "Young",
        "Future",
        "Very old"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Very old",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-113",
      "question": "Exam English: Antonym of 'increase' is what?",
      "options": [
        "rise",
        "expand",
        "decrease",
        "grow"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: decrease",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-114",
      "question": "Exam English: Antonym of 'accept' is what?",
      "options": [
        "receive",
        "refuse",
        "agree",
        "take"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: refuse",
      "difficulty": "hard",
      "topic": "Vocabulary"
    },
    {
      "id": "english-hard-115",
      "question": "Exam English: Correct form: The news ___ true.",
      "options": [
        "is",
        "are",
        "have",
        "were"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: is",
      "difficulty": "hard",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-hard-116",
      "question": "Exam English: Correct form: Mathematics ___ my favorite subject.",
      "options": [
        "were",
        "have",
        "are",
        "is"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: is",
      "difficulty": "hard",
      "topic": "Subject-Verb"
    },
    {
      "id": "english-hard-117",
      "question": "Exam English: Choose the noun: 'Honesty is a virtue.'",
      "options": [
        "virtue is",
        "is",
        "Honesty",
        "a"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Honesty",
      "difficulty": "hard",
      "topic": "Noun"
    },
    {
      "id": "english-hard-118",
      "question": "Exam English: Choose the pronoun: 'They are playing.'",
      "options": [
        "are",
        "play",
        "playing",
        "They"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: They",
      "difficulty": "hard",
      "topic": "Pronoun"
    },
    {
      "id": "english-hard-119",
      "question": "Exam English: Choose the correct sentence.",
      "options": [
        "I have did my homework.",
        "I done my homework.",
        "I have done my homework.",
        "I has done my homework."
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: I have done my homework.",
      "difficulty": "hard",
      "topic": "Grammar"
    },
    {
      "id": "english-hard-120",
      "question": "Exam English: Choose correct comparative form of good.",
      "options": [
        "gooder",
        "best",
        "more good",
        "better"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: better",
      "difficulty": "hard",
      "topic": "Degree"
    }
  ],
  "ict": [
    {
      "id": "ict-easy-1",
      "question": "CPU stands for what?",
      "options": [
        "Central Program Unit",
        "Central Process Unit",
        "Computer Processing Unit",
        "Central Processing Unit"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Central Processing Unit",
      "difficulty": "easy",
      "topic": "Hardware"
    },
    {
      "id": "ict-easy-2",
      "question": "RAM stands for what?",
      "options": [
        "Random Access Memory",
        "Run Access Module",
        "Random Active Memory",
        "Read Access Memory"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Random Access Memory",
      "difficulty": "easy",
      "topic": "Memory"
    },
    {
      "id": "ict-easy-3",
      "question": "ROM stands for what?",
      "options": [
        "Run Only Module",
        "Read Open Memory",
        "Random Only Memory",
        "Read Only Memory"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Read Only Memory",
      "difficulty": "easy",
      "topic": "Memory"
    },
    {
      "id": "ict-easy-4",
      "question": "Which device is an input device?",
      "options": [
        "Speaker",
        "Keyboard",
        "Monitor",
        "Printer"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Keyboard",
      "difficulty": "easy",
      "topic": "Hardware"
    },
    {
      "id": "ict-easy-5",
      "question": "Which device is an output device?",
      "options": [
        "Monitor",
        "Scanner",
        "Mouse",
        "Keyboard"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Monitor",
      "difficulty": "easy",
      "topic": "Hardware"
    },
    {
      "id": "ict-easy-6",
      "question": "HTML is mainly used for what?",
      "options": [
        "Database design",
        "Operating system",
        "Image editing",
        "Web page structure"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Web page structure",
      "difficulty": "easy",
      "topic": "Web"
    },
    {
      "id": "ict-easy-7",
      "question": "CSS is mainly used for what?",
      "options": [
        "Web page styling",
        "Hardware control",
        "Virus scanning",
        "Data storage"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Web page styling",
      "difficulty": "easy",
      "topic": "Web"
    },
    {
      "id": "ict-easy-8",
      "question": "JavaScript is mainly used for what?",
      "options": [
        "Only printing",
        "Web interactivity",
        "Only typing",
        "Only electricity"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Web interactivity",
      "difficulty": "easy",
      "topic": "Web"
    },
    {
      "id": "ict-easy-9",
      "question": "Binary number system uses which digits?",
      "options": [
        "1 and 2",
        "0 and 1",
        "A to F",
        "0 to 9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 0 and 1",
      "difficulty": "easy",
      "topic": "Number System"
    },
    {
      "id": "ict-easy-10",
      "question": "Decimal number system has base what?",
      "options": [
        "10",
        "2",
        "16",
        "8"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 10",
      "difficulty": "easy",
      "topic": "Number System"
    },
    {
      "id": "ict-easy-11",
      "question": "Binary number system has base what?",
      "options": [
        "16",
        "2",
        "8",
        "10"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 2",
      "difficulty": "easy",
      "topic": "Number System"
    },
    {
      "id": "ict-easy-12",
      "question": "Hexadecimal number system has base what?",
      "options": [
        "2",
        "16",
        "10",
        "8"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 16",
      "difficulty": "easy",
      "topic": "Number System"
    },
    {
      "id": "ict-easy-13",
      "question": "DBMS stands for what?",
      "options": [
        "Digital Base Management",
        "Data Basic Machine System",
        "Database Management System",
        "Database Memory Set"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Database Management System",
      "difficulty": "easy",
      "topic": "Database"
    },
    {
      "id": "ict-easy-14",
      "question": "SQL is used mainly for what?",
      "options": [
        "Creating virus",
        "Playing audio",
        "Drawing images",
        "Managing databases"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Managing databases",
      "difficulty": "easy",
      "topic": "Database"
    },
    {
      "id": "ict-easy-15",
      "question": "Primary key is used to do what?",
      "options": [
        "Increase screen size",
        "Encrypt monitor",
        "Uniquely identify records",
        "Store duplicate data"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Uniquely identify records",
      "difficulty": "easy",
      "topic": "Database"
    },
    {
      "id": "ict-easy-16",
      "question": "Which protocol is used for web pages?",
      "options": [
        "USB",
        "SMTP only",
        "FTP only",
        "HTTP"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: HTTP",
      "difficulty": "easy",
      "topic": "Internet"
    },
    {
      "id": "ict-easy-17",
      "question": "HTTPS is more secure than HTTP because it uses what?",
      "options": [
        "Larger screen",
        "More RAM",
        "Encryption",
        "More keyboard"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Encryption",
      "difficulty": "easy",
      "topic": "Internet"
    },
    {
      "id": "ict-easy-18",
      "question": "IP address identifies what?",
      "options": [
        "A device on a network",
        "A printer cartridge",
        "A file extension",
        "A monitor pixel"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: A device on a network",
      "difficulty": "easy",
      "topic": "Networking"
    },
    {
      "id": "ict-easy-19",
      "question": "LAN stands for what?",
      "options": [
        "Local Audio Number",
        "Long Area Node",
        "Local Area Network",
        "Large Access Network"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Local Area Network",
      "difficulty": "easy",
      "topic": "Networking"
    },
    {
      "id": "ict-easy-20",
      "question": "WAN stands for what?",
      "options": [
        "Wide Area Network",
        "Wide Active Number",
        "Wireless Audio Network",
        "Web Access Node"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Wide Area Network",
      "difficulty": "easy",
      "topic": "Networking"
    },
    {
      "id": "ict-easy-21",
      "question": "A browser is used to do what?",
      "options": [
        "Compile metal",
        "Charge battery",
        "Access web pages",
        "Measure voltage"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Access web pages",
      "difficulty": "easy",
      "topic": "Internet"
    },
    {
      "id": "ict-easy-22",
      "question": "Which is an operating system?",
      "options": [
        "Windows",
        "Google Chrome",
        "MS Word",
        "Photoshop"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Windows",
      "difficulty": "easy",
      "topic": "Software"
    },
    {
      "id": "ict-easy-23",
      "question": "Which is application software?",
      "options": [
        "Kernel",
        "Device driver",
        "MS Word",
        "BIOS"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: MS Word",
      "difficulty": "easy",
      "topic": "Software"
    },
    {
      "id": "ict-easy-24",
      "question": "Malware means what?",
      "options": [
        "Manual hardware",
        "Music software",
        "Memory light",
        "Malicious software"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Malicious software",
      "difficulty": "easy",
      "topic": "Security"
    },
    {
      "id": "ict-easy-25",
      "question": "Firewall helps to do what?",
      "options": [
        "Protect network traffic",
        "Increase monitor size",
        "Print documents only",
        "Charge phone"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Protect network traffic",
      "difficulty": "easy",
      "topic": "Security"
    },
    {
      "id": "ict-easy-26",
      "question": "Phishing is a type of what?",
      "options": [
        "Data backup",
        "Online fraud",
        "Hardware device",
        "Programming language"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Online fraud",
      "difficulty": "easy",
      "topic": "Security"
    },
    {
      "id": "ict-easy-27",
      "question": "Cloud storage means storing data where?",
      "options": [
        "Only on paper",
        "Only in monitor",
        "Only inside keyboard",
        "On internet servers"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: On internet servers",
      "difficulty": "easy",
      "topic": "Cloud"
    },
    {
      "id": "ict-easy-28",
      "question": "Google Drive is an example of what?",
      "options": [
        "Cloud storage",
        "CPU",
        "Graphics card",
        "RAM"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cloud storage",
      "difficulty": "easy",
      "topic": "Cloud"
    },
    {
      "id": "ict-easy-29",
      "question": "Algorithm means what?",
      "options": [
        "Computer virus",
        "Step-by-step solution",
        "Random drawing",
        "Monitor color"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Step-by-step solution",
      "difficulty": "easy",
      "topic": "Programming"
    },
    {
      "id": "ict-easy-30",
      "question": "Flowchart uses what to show steps?",
      "options": [
        "Only paragraphs",
        "Only sound",
        "Symbols",
        "Only cables"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Symbols",
      "difficulty": "easy",
      "topic": "Programming"
    },
    {
      "id": "ict-easy-31",
      "question": "Variable is used to store what?",
      "options": [
        "Data value",
        "Printer ink",
        "Monitor stand",
        "Electric charge"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Data value",
      "difficulty": "easy",
      "topic": "Programming"
    },
    {
      "id": "ict-easy-32",
      "question": "Loop is used to do what?",
      "options": [
        "Stop all programs",
        "Make screen larger",
        "Delete hardware",
        "Repeat instructions"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Repeat instructions",
      "difficulty": "easy",
      "topic": "Programming"
    },
    {
      "id": "ict-easy-33",
      "question": "Which one is a programming language?",
      "options": [
        "Chrome",
        "Python",
        "Google",
        "Windows"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Python",
      "difficulty": "easy",
      "topic": "Programming"
    },
    {
      "id": "ict-easy-34",
      "question": "File extension of a text file is commonly what?",
      "options": [
        ".jpg",
        ".mp3",
        ".txt",
        ".exe"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: .txt",
      "difficulty": "easy",
      "topic": "Files"
    },
    {
      "id": "ict-easy-35",
      "question": "PDF stands for what?",
      "options": [
        "Portable Document Format",
        "Portable Disk File",
        "Printed Data File",
        "Personal Document Folder"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Portable Document Format",
      "difficulty": "easy",
      "topic": "Files"
    },
    {
      "id": "ict-easy-36",
      "question": "URL stands for what?",
      "options": [
        "User Resource Link",
        "Uniform Read Line",
        "Uniform Resource Locator",
        "Universal Run Language"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Uniform Resource Locator",
      "difficulty": "easy",
      "topic": "Internet"
    },
    {
      "id": "ict-easy-37",
      "question": "Email is used to send what?",
      "options": [
        "Physical parcels",
        "Only cash",
        "Only electricity",
        "Electronic messages"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electronic messages",
      "difficulty": "easy",
      "topic": "Internet"
    },
    {
      "id": "ict-easy-38",
      "question": "Cyber security protects what?",
      "options": [
        "Digital systems and data",
        "Only buildings",
        "Only books",
        "Only furniture"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Digital systems and data",
      "difficulty": "easy",
      "topic": "Security"
    },
    {
      "id": "ict-easy-39",
      "question": "Backup means what?",
      "options": [
        "Copy of data for safety",
        "Deleting data",
        "Breaking data",
        "Hiding screen"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Copy of data for safety",
      "difficulty": "easy",
      "topic": "Data"
    },
    {
      "id": "ict-easy-40",
      "question": "Open-source software means what?",
      "options": [
        "Cannot be edited",
        "Source code is available",
        "No code exists",
        "Only paid software"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Source code is available",
      "difficulty": "easy",
      "topic": "Software"
    },
    {
      "id": "ict-medium-41",
      "question": "ICT concept: CPU stands for what?",
      "options": [
        "Central Processing Unit",
        "Central Process Unit",
        "Central Program Unit",
        "Computer Processing Unit"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Central Processing Unit",
      "difficulty": "medium",
      "topic": "Hardware"
    },
    {
      "id": "ict-medium-42",
      "question": "ICT concept: RAM stands for what?",
      "options": [
        "Random Access Memory",
        "Random Active Memory",
        "Run Access Module",
        "Read Access Memory"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Random Access Memory",
      "difficulty": "medium",
      "topic": "Memory"
    },
    {
      "id": "ict-medium-43",
      "question": "ICT concept: ROM stands for what?",
      "options": [
        "Read Only Memory",
        "Random Only Memory",
        "Run Only Module",
        "Read Open Memory"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Read Only Memory",
      "difficulty": "medium",
      "topic": "Memory"
    },
    {
      "id": "ict-medium-44",
      "question": "ICT concept: Which device is an input device?",
      "options": [
        "Speaker",
        "Keyboard",
        "Monitor",
        "Printer"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Keyboard",
      "difficulty": "medium",
      "topic": "Hardware"
    },
    {
      "id": "ict-medium-45",
      "question": "ICT concept: Which device is an output device?",
      "options": [
        "Keyboard",
        "Monitor",
        "Mouse",
        "Scanner"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Monitor",
      "difficulty": "medium",
      "topic": "Hardware"
    },
    {
      "id": "ict-medium-46",
      "question": "ICT concept: HTML is mainly used for what?",
      "options": [
        "Web page structure",
        "Database design",
        "Image editing",
        "Operating system"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Web page structure",
      "difficulty": "medium",
      "topic": "Web"
    },
    {
      "id": "ict-medium-47",
      "question": "ICT concept: CSS is mainly used for what?",
      "options": [
        "Virus scanning",
        "Data storage",
        "Hardware control",
        "Web page styling"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Web page styling",
      "difficulty": "medium",
      "topic": "Web"
    },
    {
      "id": "ict-medium-48",
      "question": "ICT concept: JavaScript is mainly used for what?",
      "options": [
        "Only typing",
        "Web interactivity",
        "Only electricity",
        "Only printing"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Web interactivity",
      "difficulty": "medium",
      "topic": "Web"
    },
    {
      "id": "ict-medium-49",
      "question": "ICT concept: Binary number system uses which digits?",
      "options": [
        "A to F",
        "1 and 2",
        "0 to 9",
        "0 and 1"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 0 and 1",
      "difficulty": "medium",
      "topic": "Number System"
    },
    {
      "id": "ict-medium-50",
      "question": "ICT concept: Decimal number system has base what?",
      "options": [
        "10",
        "16",
        "8",
        "2"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 10",
      "difficulty": "medium",
      "topic": "Number System"
    },
    {
      "id": "ict-medium-51",
      "question": "ICT concept: Binary number system has base what?",
      "options": [
        "16",
        "2",
        "10",
        "8"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 2",
      "difficulty": "medium",
      "topic": "Number System"
    },
    {
      "id": "ict-medium-52",
      "question": "ICT concept: Hexadecimal number system has base what?",
      "options": [
        "2",
        "10",
        "8",
        "16"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 16",
      "difficulty": "medium",
      "topic": "Number System"
    },
    {
      "id": "ict-medium-53",
      "question": "ICT concept: DBMS stands for what?",
      "options": [
        "Database Memory Set",
        "Digital Base Management",
        "Database Management System",
        "Data Basic Machine System"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Database Management System",
      "difficulty": "medium",
      "topic": "Database"
    },
    {
      "id": "ict-medium-54",
      "question": "ICT concept: SQL is used mainly for what?",
      "options": [
        "Creating virus",
        "Managing databases",
        "Drawing images",
        "Playing audio"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Managing databases",
      "difficulty": "medium",
      "topic": "Database"
    },
    {
      "id": "ict-medium-55",
      "question": "ICT concept: Primary key is used to do what?",
      "options": [
        "Store duplicate data",
        "Uniquely identify records",
        "Encrypt monitor",
        "Increase screen size"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Uniquely identify records",
      "difficulty": "medium",
      "topic": "Database"
    },
    {
      "id": "ict-medium-56",
      "question": "ICT concept: Which protocol is used for web pages?",
      "options": [
        "HTTP",
        "FTP only",
        "SMTP only",
        "USB"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: HTTP",
      "difficulty": "medium",
      "topic": "Internet"
    },
    {
      "id": "ict-medium-57",
      "question": "ICT concept: HTTPS is more secure than HTTP because it uses what?",
      "options": [
        "Larger screen",
        "More keyboard",
        "More RAM",
        "Encryption"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Encryption",
      "difficulty": "medium",
      "topic": "Internet"
    },
    {
      "id": "ict-medium-58",
      "question": "ICT concept: IP address identifies what?",
      "options": [
        "A device on a network",
        "A file extension",
        "A monitor pixel",
        "A printer cartridge"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: A device on a network",
      "difficulty": "medium",
      "topic": "Networking"
    },
    {
      "id": "ict-medium-59",
      "question": "ICT concept: LAN stands for what?",
      "options": [
        "Local Area Network",
        "Large Access Network",
        "Local Audio Number",
        "Long Area Node"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Local Area Network",
      "difficulty": "medium",
      "topic": "Networking"
    },
    {
      "id": "ict-medium-60",
      "question": "ICT concept: WAN stands for what?",
      "options": [
        "Web Access Node",
        "Wireless Audio Network",
        "Wide Area Network",
        "Wide Active Number"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Wide Area Network",
      "difficulty": "medium",
      "topic": "Networking"
    },
    {
      "id": "ict-medium-61",
      "question": "ICT concept: A browser is used to do what?",
      "options": [
        "Access web pages",
        "Compile metal",
        "Measure voltage",
        "Charge battery"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Access web pages",
      "difficulty": "medium",
      "topic": "Internet"
    },
    {
      "id": "ict-medium-62",
      "question": "ICT concept: Which is an operating system?",
      "options": [
        "Windows",
        "Google Chrome",
        "Photoshop",
        "MS Word"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Windows",
      "difficulty": "medium",
      "topic": "Software"
    },
    {
      "id": "ict-medium-63",
      "question": "ICT concept: Which is application software?",
      "options": [
        "Kernel",
        "Device driver",
        "MS Word",
        "BIOS"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: MS Word",
      "difficulty": "medium",
      "topic": "Software"
    },
    {
      "id": "ict-medium-64",
      "question": "ICT concept: Malware means what?",
      "options": [
        "Memory light",
        "Music software",
        "Malicious software",
        "Manual hardware"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Malicious software",
      "difficulty": "medium",
      "topic": "Security"
    },
    {
      "id": "ict-medium-65",
      "question": "ICT concept: Firewall helps to do what?",
      "options": [
        "Increase monitor size",
        "Protect network traffic",
        "Charge phone",
        "Print documents only"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Protect network traffic",
      "difficulty": "medium",
      "topic": "Security"
    },
    {
      "id": "ict-medium-66",
      "question": "ICT concept: Phishing is a type of what?",
      "options": [
        "Online fraud",
        "Programming language",
        "Data backup",
        "Hardware device"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Online fraud",
      "difficulty": "medium",
      "topic": "Security"
    },
    {
      "id": "ict-medium-67",
      "question": "ICT concept: Cloud storage means storing data where?",
      "options": [
        "On internet servers",
        "Only inside keyboard",
        "Only in monitor",
        "Only on paper"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: On internet servers",
      "difficulty": "medium",
      "topic": "Cloud"
    },
    {
      "id": "ict-medium-68",
      "question": "ICT concept: Google Drive is an example of what?",
      "options": [
        "Graphics card",
        "CPU",
        "Cloud storage",
        "RAM"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Cloud storage",
      "difficulty": "medium",
      "topic": "Cloud"
    },
    {
      "id": "ict-medium-69",
      "question": "ICT concept: Algorithm means what?",
      "options": [
        "Computer virus",
        "Step-by-step solution",
        "Random drawing",
        "Monitor color"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Step-by-step solution",
      "difficulty": "medium",
      "topic": "Programming"
    },
    {
      "id": "ict-medium-70",
      "question": "ICT concept: Flowchart uses what to show steps?",
      "options": [
        "Only cables",
        "Only paragraphs",
        "Symbols",
        "Only sound"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Symbols",
      "difficulty": "medium",
      "topic": "Programming"
    },
    {
      "id": "ict-medium-71",
      "question": "ICT concept: Variable is used to store what?",
      "options": [
        "Monitor stand",
        "Electric charge",
        "Printer ink",
        "Data value"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Data value",
      "difficulty": "medium",
      "topic": "Programming"
    },
    {
      "id": "ict-medium-72",
      "question": "ICT concept: Loop is used to do what?",
      "options": [
        "Repeat instructions",
        "Delete hardware",
        "Stop all programs",
        "Make screen larger"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Repeat instructions",
      "difficulty": "medium",
      "topic": "Programming"
    },
    {
      "id": "ict-medium-73",
      "question": "ICT concept: Which one is a programming language?",
      "options": [
        "Windows",
        "Google",
        "Python",
        "Chrome"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Python",
      "difficulty": "medium",
      "topic": "Programming"
    },
    {
      "id": "ict-medium-74",
      "question": "ICT concept: File extension of a text file is commonly what?",
      "options": [
        ".exe",
        ".mp3",
        ".txt",
        ".jpg"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: .txt",
      "difficulty": "medium",
      "topic": "Files"
    },
    {
      "id": "ict-medium-75",
      "question": "ICT concept: PDF stands for what?",
      "options": [
        "Portable Disk File",
        "Personal Document Folder",
        "Portable Document Format",
        "Printed Data File"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Portable Document Format",
      "difficulty": "medium",
      "topic": "Files"
    },
    {
      "id": "ict-medium-76",
      "question": "ICT concept: URL stands for what?",
      "options": [
        "Uniform Read Line",
        "Uniform Resource Locator",
        "User Resource Link",
        "Universal Run Language"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Uniform Resource Locator",
      "difficulty": "medium",
      "topic": "Internet"
    },
    {
      "id": "ict-medium-77",
      "question": "ICT concept: Email is used to send what?",
      "options": [
        "Only cash",
        "Physical parcels",
        "Only electricity",
        "Electronic messages"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electronic messages",
      "difficulty": "medium",
      "topic": "Internet"
    },
    {
      "id": "ict-medium-78",
      "question": "ICT concept: Cyber security protects what?",
      "options": [
        "Digital systems and data",
        "Only furniture",
        "Only buildings",
        "Only books"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Digital systems and data",
      "difficulty": "medium",
      "topic": "Security"
    },
    {
      "id": "ict-medium-79",
      "question": "ICT concept: Backup means what?",
      "options": [
        "Deleting data",
        "Hiding screen",
        "Breaking data",
        "Copy of data for safety"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Copy of data for safety",
      "difficulty": "medium",
      "topic": "Data"
    },
    {
      "id": "ict-medium-80",
      "question": "ICT concept: Open-source software means what?",
      "options": [
        "Only paid software",
        "Cannot be edited",
        "No code exists",
        "Source code is available"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Source code is available",
      "difficulty": "medium",
      "topic": "Software"
    },
    {
      "id": "ict-hard-81",
      "question": "Exam ICT: CPU stands for what?",
      "options": [
        "Central Processing Unit",
        "Central Process Unit",
        "Computer Processing Unit",
        "Central Program Unit"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Central Processing Unit",
      "difficulty": "hard",
      "topic": "Hardware"
    },
    {
      "id": "ict-hard-82",
      "question": "Exam ICT: RAM stands for what?",
      "options": [
        "Read Access Memory",
        "Random Access Memory",
        "Random Active Memory",
        "Run Access Module"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Random Access Memory",
      "difficulty": "hard",
      "topic": "Memory"
    },
    {
      "id": "ict-hard-83",
      "question": "Exam ICT: ROM stands for what?",
      "options": [
        "Read Only Memory",
        "Run Only Module",
        "Random Only Memory",
        "Read Open Memory"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Read Only Memory",
      "difficulty": "hard",
      "topic": "Memory"
    },
    {
      "id": "ict-hard-84",
      "question": "Exam ICT: Which device is an input device?",
      "options": [
        "Monitor",
        "Printer",
        "Speaker",
        "Keyboard"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Keyboard",
      "difficulty": "hard",
      "topic": "Hardware"
    },
    {
      "id": "ict-hard-85",
      "question": "Exam ICT: Which device is an output device?",
      "options": [
        "Scanner",
        "Mouse",
        "Keyboard",
        "Monitor"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Monitor",
      "difficulty": "hard",
      "topic": "Hardware"
    },
    {
      "id": "ict-hard-86",
      "question": "Exam ICT: HTML is mainly used for what?",
      "options": [
        "Image editing",
        "Operating system",
        "Web page structure",
        "Database design"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Web page structure",
      "difficulty": "hard",
      "topic": "Web"
    },
    {
      "id": "ict-hard-87",
      "question": "Exam ICT: CSS is mainly used for what?",
      "options": [
        "Hardware control",
        "Data storage",
        "Web page styling",
        "Virus scanning"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Web page styling",
      "difficulty": "hard",
      "topic": "Web"
    },
    {
      "id": "ict-hard-88",
      "question": "Exam ICT: JavaScript is mainly used for what?",
      "options": [
        "Only printing",
        "Only typing",
        "Only electricity",
        "Web interactivity"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Web interactivity",
      "difficulty": "hard",
      "topic": "Web"
    },
    {
      "id": "ict-hard-89",
      "question": "Exam ICT: Binary number system uses which digits?",
      "options": [
        "A to F",
        "0 to 9",
        "1 and 2",
        "0 and 1"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 0 and 1",
      "difficulty": "hard",
      "topic": "Number System"
    },
    {
      "id": "ict-hard-90",
      "question": "Exam ICT: Decimal number system has base what?",
      "options": [
        "10",
        "2",
        "8",
        "16"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 10",
      "difficulty": "hard",
      "topic": "Number System"
    },
    {
      "id": "ict-hard-91",
      "question": "Exam ICT: Binary number system has base what?",
      "options": [
        "2",
        "16",
        "10",
        "8"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 2",
      "difficulty": "hard",
      "topic": "Number System"
    },
    {
      "id": "ict-hard-92",
      "question": "Exam ICT: Hexadecimal number system has base what?",
      "options": [
        "2",
        "10",
        "16",
        "8"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: 16",
      "difficulty": "hard",
      "topic": "Number System"
    },
    {
      "id": "ict-hard-93",
      "question": "Exam ICT: DBMS stands for what?",
      "options": [
        "Digital Base Management",
        "Data Basic Machine System",
        "Database Management System",
        "Database Memory Set"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Database Management System",
      "difficulty": "hard",
      "topic": "Database"
    },
    {
      "id": "ict-hard-94",
      "question": "Exam ICT: SQL is used mainly for what?",
      "options": [
        "Drawing images",
        "Managing databases",
        "Creating virus",
        "Playing audio"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Managing databases",
      "difficulty": "hard",
      "topic": "Database"
    },
    {
      "id": "ict-hard-95",
      "question": "Exam ICT: Primary key is used to do what?",
      "options": [
        "Increase screen size",
        "Store duplicate data",
        "Encrypt monitor",
        "Uniquely identify records"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Uniquely identify records",
      "difficulty": "hard",
      "topic": "Database"
    },
    {
      "id": "ict-hard-96",
      "question": "Exam ICT: Which protocol is used for web pages?",
      "options": [
        "FTP only",
        "HTTP",
        "USB",
        "SMTP only"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: HTTP",
      "difficulty": "hard",
      "topic": "Internet"
    },
    {
      "id": "ict-hard-97",
      "question": "Exam ICT: HTTPS is more secure than HTTP because it uses what?",
      "options": [
        "Encryption",
        "More keyboard",
        "More RAM",
        "Larger screen"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Encryption",
      "difficulty": "hard",
      "topic": "Internet"
    },
    {
      "id": "ict-hard-98",
      "question": "Exam ICT: IP address identifies what?",
      "options": [
        "A device on a network",
        "A printer cartridge",
        "A monitor pixel",
        "A file extension"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: A device on a network",
      "difficulty": "hard",
      "topic": "Networking"
    },
    {
      "id": "ict-hard-99",
      "question": "Exam ICT: LAN stands for what?",
      "options": [
        "Local Audio Number",
        "Long Area Node",
        "Large Access Network",
        "Local Area Network"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Local Area Network",
      "difficulty": "hard",
      "topic": "Networking"
    },
    {
      "id": "ict-hard-100",
      "question": "Exam ICT: WAN stands for what?",
      "options": [
        "Wide Active Number",
        "Web Access Node",
        "Wide Area Network",
        "Wireless Audio Network"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Wide Area Network",
      "difficulty": "hard",
      "topic": "Networking"
    },
    {
      "id": "ict-hard-101",
      "question": "Exam ICT: A browser is used to do what?",
      "options": [
        "Compile metal",
        "Measure voltage",
        "Access web pages",
        "Charge battery"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Access web pages",
      "difficulty": "hard",
      "topic": "Internet"
    },
    {
      "id": "ict-hard-102",
      "question": "Exam ICT: Which is an operating system?",
      "options": [
        "Photoshop",
        "Windows",
        "Google Chrome",
        "MS Word"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Windows",
      "difficulty": "hard",
      "topic": "Software"
    },
    {
      "id": "ict-hard-103",
      "question": "Exam ICT: Which is application software?",
      "options": [
        "MS Word",
        "Kernel",
        "BIOS",
        "Device driver"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: MS Word",
      "difficulty": "hard",
      "topic": "Software"
    },
    {
      "id": "ict-hard-104",
      "question": "Exam ICT: Malware means what?",
      "options": [
        "Music software",
        "Malicious software",
        "Memory light",
        "Manual hardware"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Malicious software",
      "difficulty": "hard",
      "topic": "Security"
    },
    {
      "id": "ict-hard-105",
      "question": "Exam ICT: Firewall helps to do what?",
      "options": [
        "Protect network traffic",
        "Increase monitor size",
        "Charge phone",
        "Print documents only"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Protect network traffic",
      "difficulty": "hard",
      "topic": "Security"
    },
    {
      "id": "ict-hard-106",
      "question": "Exam ICT: Phishing is a type of what?",
      "options": [
        "Hardware device",
        "Programming language",
        "Online fraud",
        "Data backup"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Online fraud",
      "difficulty": "hard",
      "topic": "Security"
    },
    {
      "id": "ict-hard-107",
      "question": "Exam ICT: Cloud storage means storing data where?",
      "options": [
        "Only on paper",
        "On internet servers",
        "Only inside keyboard",
        "Only in monitor"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: On internet servers",
      "difficulty": "hard",
      "topic": "Cloud"
    },
    {
      "id": "ict-hard-108",
      "question": "Exam ICT: Google Drive is an example of what?",
      "options": [
        "Cloud storage",
        "CPU",
        "RAM",
        "Graphics card"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cloud storage",
      "difficulty": "hard",
      "topic": "Cloud"
    },
    {
      "id": "ict-hard-109",
      "question": "Exam ICT: Algorithm means what?",
      "options": [
        "Monitor color",
        "Random drawing",
        "Computer virus",
        "Step-by-step solution"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Step-by-step solution",
      "difficulty": "hard",
      "topic": "Programming"
    },
    {
      "id": "ict-hard-110",
      "question": "Exam ICT: Flowchart uses what to show steps?",
      "options": [
        "Only paragraphs",
        "Symbols",
        "Only cables",
        "Only sound"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Symbols",
      "difficulty": "hard",
      "topic": "Programming"
    },
    {
      "id": "ict-hard-111",
      "question": "Exam ICT: Variable is used to store what?",
      "options": [
        "Electric charge",
        "Monitor stand",
        "Data value",
        "Printer ink"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Data value",
      "difficulty": "hard",
      "topic": "Programming"
    },
    {
      "id": "ict-hard-112",
      "question": "Exam ICT: Loop is used to do what?",
      "options": [
        "Repeat instructions",
        "Make screen larger",
        "Stop all programs",
        "Delete hardware"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Repeat instructions",
      "difficulty": "hard",
      "topic": "Programming"
    },
    {
      "id": "ict-hard-113",
      "question": "Exam ICT: Which one is a programming language?",
      "options": [
        "Python",
        "Chrome",
        "Windows",
        "Google"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Python",
      "difficulty": "hard",
      "topic": "Programming"
    },
    {
      "id": "ict-hard-114",
      "question": "Exam ICT: File extension of a text file is commonly what?",
      "options": [
        ".mp3",
        ".jpg",
        ".txt",
        ".exe"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: .txt",
      "difficulty": "hard",
      "topic": "Files"
    },
    {
      "id": "ict-hard-115",
      "question": "Exam ICT: PDF stands for what?",
      "options": [
        "Portable Document Format",
        "Printed Data File",
        "Personal Document Folder",
        "Portable Disk File"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Portable Document Format",
      "difficulty": "hard",
      "topic": "Files"
    },
    {
      "id": "ict-hard-116",
      "question": "Exam ICT: URL stands for what?",
      "options": [
        "Universal Run Language",
        "Uniform Read Line",
        "User Resource Link",
        "Uniform Resource Locator"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Uniform Resource Locator",
      "difficulty": "hard",
      "topic": "Internet"
    },
    {
      "id": "ict-hard-117",
      "question": "Exam ICT: Email is used to send what?",
      "options": [
        "Physical parcels",
        "Only electricity",
        "Only cash",
        "Electronic messages"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Electronic messages",
      "difficulty": "hard",
      "topic": "Internet"
    },
    {
      "id": "ict-hard-118",
      "question": "Exam ICT: Cyber security protects what?",
      "options": [
        "Only books",
        "Only buildings",
        "Digital systems and data",
        "Only furniture"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Digital systems and data",
      "difficulty": "hard",
      "topic": "Security"
    },
    {
      "id": "ict-hard-119",
      "question": "Exam ICT: Backup means what?",
      "options": [
        "Deleting data",
        "Breaking data",
        "Copy of data for safety",
        "Hiding screen"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Copy of data for safety",
      "difficulty": "hard",
      "topic": "Data"
    },
    {
      "id": "ict-hard-120",
      "question": "Exam ICT: Open-source software means what?",
      "options": [
        "No code exists",
        "Only paid software",
        "Source code is available",
        "Cannot be edited"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Source code is available",
      "difficulty": "hard",
      "topic": "Software"
    }
  ],
  "bangla": [
    {
      "id": "bangla-easy-1",
      "question": "বাংলা বর্ণমালায় স্বরবর্ণ কয়টি?",
      "options": [
        "১২",
        "১৩",
        "১০",
        "১১"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ১১",
      "difficulty": "easy",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-easy-2",
      "question": "বাংলা বর্ণমালায় ব্যঞ্জনবর্ণ কয়টি?",
      "options": [
        "৩৭",
        "৩৯",
        "৩৫",
        "৪১"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ৩৯",
      "difficulty": "easy",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-easy-3",
      "question": "বাংলা ভাষার জাতীয় কবি কে?",
      "options": [
        "কাজী নজরুল ইসলাম",
        "রবীন্দ্রনাথ ঠাকুর",
        "জসীমউদ্দীন",
        "সুকান্ত ভট্টাচার্য"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-4",
      "question": "বাংলা সাহিত্যের প্রথম মহাকাব্য কোনটি?",
      "options": [
        "সোনার তরী",
        "নক্সী কাঁথার মাঠ",
        "গীতাঞ্জলি",
        "মেঘনাদবধ কাব্য"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: মেঘনাদবধ কাব্য",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-5",
      "question": "মেঘনাদবধ কাব্যের রচয়িতা কে?",
      "options": [
        "রবীন্দ্রনাথ ঠাকুর",
        "বঙ্কিমচন্দ্র",
        "কাজী নজরুল ইসলাম",
        "মাইকেল মধুসূদন দত্ত"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-6",
      "question": "গীতাঞ্জলির রচয়িতা কে?",
      "options": [
        "জসীমউদ্দীন",
        "নজরুল",
        "শরৎচন্দ্র",
        "রবীন্দ্রনাথ ঠাকুর"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-7",
      "question": "নক্সী কাঁথার মাঠ কার লেখা?",
      "options": [
        "রবীন্দ্রনাথ",
        "জসীমউদ্দীন",
        "মাইকেল",
        "নজরুল"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-8",
      "question": "বাংলা ব্যাকরণে শব্দের ক্ষুদ্রতম অর্থপূর্ণ একক কী?",
      "options": [
        "বর্ণ",
        "ধ্বনি",
        "বাক্য",
        "রূপিম"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: রূপিম",
      "difficulty": "easy",
      "topic": "ব্যাকরণ"
    },
    {
      "id": "bangla-easy-9",
      "question": "যে শব্দ ক্রিয়ার কাজ বোঝায় তাকে কী বলে?",
      "options": [
        "সর্বনাম",
        "বিশেষণ",
        "বিশেষ্য",
        "ক্রিয়া"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ক্রিয়া",
      "difficulty": "easy",
      "topic": "পদ"
    },
    {
      "id": "bangla-easy-10",
      "question": "যে পদ নাম বোঝায় তাকে কী বলে?",
      "options": [
        "অব্যয়",
        "বিশেষণ",
        "বিশেষ্য",
        "ক্রিয়া"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বিশেষ্য",
      "difficulty": "easy",
      "topic": "পদ"
    },
    {
      "id": "bangla-easy-11",
      "question": "যে পদ বিশেষ্যের দোষ-গুণ বোঝায় তাকে কী বলে?",
      "options": [
        "বিশেষণ",
        "অব্যয়",
        "সর্বনাম",
        "ক্রিয়া"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: বিশেষণ",
      "difficulty": "easy",
      "topic": "পদ"
    },
    {
      "id": "bangla-easy-12",
      "question": "যে পদ বিশেষ্যের পরিবর্তে ব্যবহৃত হয় তাকে কী বলে?",
      "options": [
        "বিশেষণ",
        "সর্বনাম",
        "বিশেষ্য",
        "ক্রিয়া"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: সর্বনাম",
      "difficulty": "easy",
      "topic": "পদ"
    },
    {
      "id": "bangla-easy-13",
      "question": "বাক্যের যে অংশে কাজ সম্পন্ন হওয়া বোঝায় তাকে কী বলে?",
      "options": [
        "বিধেয়",
        "কারক",
        "সমাস",
        "উদ্দেশ্য"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: বিধেয়",
      "difficulty": "easy",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-easy-14",
      "question": "বাক্যের যার সম্বন্ধে বলা হয় তাকে কী বলে?",
      "options": [
        "অব্যয়",
        "বিধেয়",
        "প্রত্যয়",
        "উদ্দেশ্য"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: উদ্দেশ্য",
      "difficulty": "easy",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-easy-15",
      "question": "সমার্থক শব্দের অর্থ কী?",
      "options": [
        "যুক্ত শব্দ",
        "একই অর্থবোধক শব্দ",
        "ধ্বনি শব্দ",
        "বিপরীত শব্দ"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: একই অর্থবোধক শব্দ",
      "difficulty": "easy",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-easy-16",
      "question": "বিপরীত শব্দের অর্থ কী?",
      "options": [
        "যৌগিক শব্দ",
        "একই অর্থবোধক শব্দ",
        "প্রবাদ",
        "বিরুদ্ধ অর্থবোধক শব্দ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: বিরুদ্ধ অর্থবোধক শব্দ",
      "difficulty": "easy",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-easy-17",
      "question": "সন্ধি কাকে বলে?",
      "options": [
        "ধ্বনির মিলন",
        "শব্দের বিভাজন",
        "বাক্যের বিভাজন",
        "অর্থের পরিবর্তন"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: ধ্বনির মিলন",
      "difficulty": "easy",
      "topic": "সন্ধি"
    },
    {
      "id": "bangla-easy-18",
      "question": "সমাস কাকে বলে?",
      "options": [
        "ধ্বনির মিলন",
        "বর্ণের বিচ্ছেদ",
        "একাধিক পদের মিলনে এক পদ",
        "ক্রিয়ার রূপ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: একাধিক পদের মিলনে এক পদ",
      "difficulty": "easy",
      "topic": "সমাস"
    },
    {
      "id": "bangla-easy-19",
      "question": "কারক কয় প্রকার?",
      "options": [
        "৫",
        "৬",
        "৪",
        "৭"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ৬",
      "difficulty": "easy",
      "topic": "কারক"
    },
    {
      "id": "bangla-easy-20",
      "question": "বিভক্তি কী?",
      "options": [
        "বর্ণের নাম",
        "উপন্যাসের নাম",
        "পদের সঙ্গে যুক্ত চিহ্ন",
        "ছন্দের নাম"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: পদের সঙ্গে যুক্ত চিহ্ন",
      "difficulty": "easy",
      "topic": "কারক"
    },
    {
      "id": "bangla-easy-21",
      "question": "রূপক অলংকার কোন ধরনের অলংকার?",
      "options": [
        "ছন্দ",
        "শব্দালংকার",
        "বর্ণালংকার",
        "অর্থালংকার"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: অর্থালংকার",
      "difficulty": "easy",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-easy-22",
      "question": "অনুপ্রাস কোন ধরনের অলংকার?",
      "options": [
        "অর্থালংকার",
        "কারক",
        "সমাস",
        "শব্দালংকার"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: শব্দালংকার",
      "difficulty": "easy",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-easy-23",
      "question": "বাংলা ভাষার আদি নিদর্শন কোনটি?",
      "options": [
        "গীতাঞ্জলি",
        "মেঘনাদবধ",
        "কপালকুণ্ডলা",
        "চর্যাপদ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: চর্যাপদ",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-24",
      "question": "চর্যাপদ কোন যুগের সাহিত্য?",
      "options": [
        "মধ্যযুগ",
        "প্রাচীন যুগ",
        "আধুনিক যুগ",
        "উত্তর আধুনিক"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: প্রাচীন যুগ",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-25",
      "question": "কপালকুণ্ডলা কার লেখা?",
      "options": [
        "নজরুল",
        "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
        "রবীন্দ্রনাথ",
        "শরৎচন্দ্র"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "easy",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-easy-26",
      "question": "দেবদাস কার লেখা?",
      "options": [
        "রবীন্দ্রনাথ",
        "শরৎচন্দ্র চট্টোপাধ্যায়",
        "বঙ্কিমচন্দ্র",
        "মাইকেল"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: শরৎচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "easy",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-easy-27",
      "question": "বাংলা ভাষার লিপি কোনটি?",
      "options": [
        "দেবনাগরী",
        "আরবি লিপি",
        "বাংলা লিপি",
        "রোমান লিপি"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বাংলা লিপি",
      "difficulty": "easy",
      "topic": "ভাষা"
    },
    {
      "id": "bangla-easy-28",
      "question": "ধ্বনি কাকে বলে?",
      "options": [
        "সমাসের রূপ",
        "লিখিত চিহ্ন",
        "উচ্চারিত শব্দের ক্ষুদ্রতম একক",
        "বাক্যের অর্থ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: উচ্চারিত শব্দের ক্ষুদ্রতম একক",
      "difficulty": "easy",
      "topic": "ধ্বনি"
    },
    {
      "id": "bangla-easy-29",
      "question": "বর্ণ কাকে বলে?",
      "options": [
        "ছন্দের মাত্রা",
        "শব্দের অর্থ",
        "ধ্বনির লিখিত রূপ",
        "বাক্যের উদ্দেশ্য"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: ধ্বনির লিখিত রূপ",
      "difficulty": "easy",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-easy-30",
      "question": "বাক্য কাকে বলে?",
      "options": [
        "একটি ধ্বনি",
        "পূর্ণ অর্থবোধক শব্দসমষ্টি",
        "শুধু বর্ণ",
        "অর্থহীন শব্দ"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: পূর্ণ অর্থবোধক শব্দসমষ্টি",
      "difficulty": "easy",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-easy-31",
      "question": "প্রত্যয় কাকে বলে?",
      "options": [
        "শব্দের শেষে যুক্ত অংশ",
        "বাক্যের শুরু",
        "শব্দের আগে যুক্ত অংশ",
        "ধ্বনির মিলন"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: শব্দের শেষে যুক্ত অংশ",
      "difficulty": "easy",
      "topic": "প্রত্যয়"
    },
    {
      "id": "bangla-easy-32",
      "question": "উপসর্গ কাকে বলে?",
      "options": [
        "শব্দের শেষে যুক্ত অংশ",
        "সমাসের নাম",
        "বাক্যের শেষে",
        "শব্দের আগে যুক্ত অংশ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: শব্দের আগে যুক্ত অংশ",
      "difficulty": "easy",
      "topic": "উপসর্গ"
    },
    {
      "id": "bangla-easy-33",
      "question": "লোকসাহিত্য কী?",
      "options": [
        "জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
        "শুধু লিখিত আইন",
        "শুধু বিজ্ঞান বই",
        "শুধু সংবাদ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-34",
      "question": "প্রবাদ কী?",
      "options": [
        "কারকের চিহ্ন",
        "ধ্বনির নাম",
        "একটি বর্ণ",
        "লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি",
      "difficulty": "easy",
      "topic": "প্রবাদ"
    },
    {
      "id": "bangla-easy-35",
      "question": "বাগধারা কী?",
      "options": [
        "বিশেষ অর্থবোধক শব্দগুচ্ছ",
        "শুধু একটি ধ্বনি",
        "শুধু নাম",
        "শুধু সংখ্যা"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: বিশেষ অর্থবোধক শব্দগুচ্ছ",
      "difficulty": "easy",
      "topic": "বাগধারা"
    },
    {
      "id": "bangla-easy-36",
      "question": "বাংলা সাহিত্যে সনেট প্রবর্তন করেন কে?",
      "options": [
        "নজরুল",
        "রবীন্দ্রনাথ",
        "মাইকেল মধুসূদন দত্ত",
        "শরৎচন্দ্র"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-37",
      "question": "বিদ্রোহী কবিতা কার লেখা?",
      "options": [
        "জসীমউদ্দীন",
        "রবীন্দ্রনাথ",
        "কাজী নজরুল ইসলাম",
        "মাইকেল"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "easy",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-easy-38",
      "question": "সোনার তরী কার কাব্যগ্রন্থ?",
      "options": [
        "মাইকেল",
        "জসীমউদ্দীন",
        "রবীন্দ্রনাথ ঠাকুর",
        "নজরুল"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "easy",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-easy-39",
      "question": "পল্লীকবি নামে পরিচিত কে?",
      "options": [
        "রবীন্দ্রনাথ",
        "জসীমউদ্দীন",
        "মাইকেল",
        "নজরুল"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "easy",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-easy-40",
      "question": "অমিত্রাক্ষর ছন্দ বাংলা সাহিত্যে কে প্রবর্তন করেন?",
      "options": [
        "নজরুল",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ",
        "সুকান্ত"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "easy",
      "topic": "ছন্দ"
    },
    {
      "id": "bangla-medium-41",
      "question": "বাংলা ব্যাকরণ: বাংলা বর্ণমালায় স্বরবর্ণ কয়টি?",
      "options": [
        "১২",
        "১০",
        "১১",
        "১৩"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: ১১",
      "difficulty": "medium",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-medium-42",
      "question": "বাংলা ব্যাকরণ: বাংলা বর্ণমালায় ব্যঞ্জনবর্ণ কয়টি?",
      "options": [
        "৩৭",
        "৩৯",
        "৪১",
        "৩৫"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ৩৯",
      "difficulty": "medium",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-medium-43",
      "question": "বাংলা ব্যাকরণ: বাংলা ভাষার জাতীয় কবি কে?",
      "options": [
        "জসীমউদ্দীন",
        "কাজী নজরুল ইসলাম",
        "রবীন্দ্রনাথ ঠাকুর",
        "সুকান্ত ভট্টাচার্য"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-44",
      "question": "বাংলা ব্যাকরণ: বাংলা সাহিত্যের প্রথম মহাকাব্য কোনটি?",
      "options": [
        "নক্সী কাঁথার মাঠ",
        "সোনার তরী",
        "মেঘনাদবধ কাব্য",
        "গীতাঞ্জলি"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: মেঘনাদবধ কাব্য",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-45",
      "question": "বাংলা ব্যাকরণ: মেঘনাদবধ কাব্যের রচয়িতা কে?",
      "options": [
        "রবীন্দ্রনাথ ঠাকুর",
        "মাইকেল মধুসূদন দত্ত",
        "কাজী নজরুল ইসলাম",
        "বঙ্কিমচন্দ্র"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-46",
      "question": "বাংলা ব্যাকরণ: গীতাঞ্জলির রচয়িতা কে?",
      "options": [
        "নজরুল",
        "জসীমউদ্দীন",
        "শরৎচন্দ্র",
        "রবীন্দ্রনাথ ঠাকুর"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-47",
      "question": "বাংলা ব্যাকরণ: নক্সী কাঁথার মাঠ কার লেখা?",
      "options": [
        "নজরুল",
        "রবীন্দ্রনাথ",
        "জসীমউদ্দীন",
        "মাইকেল"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-48",
      "question": "বাংলা ব্যাকরণ: বাংলা ব্যাকরণে শব্দের ক্ষুদ্রতম অর্থপূর্ণ একক কী?",
      "options": [
        "ধ্বনি",
        "বাক্য",
        "রূপিম",
        "বর্ণ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: রূপিম",
      "difficulty": "medium",
      "topic": "ব্যাকরণ"
    },
    {
      "id": "bangla-medium-49",
      "question": "বাংলা ব্যাকরণ: যে শব্দ ক্রিয়ার কাজ বোঝায় তাকে কী বলে?",
      "options": [
        "সর্বনাম",
        "ক্রিয়া",
        "বিশেষণ",
        "বিশেষ্য"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ক্রিয়া",
      "difficulty": "medium",
      "topic": "পদ"
    },
    {
      "id": "bangla-medium-50",
      "question": "বাংলা ব্যাকরণ: যে পদ নাম বোঝায় তাকে কী বলে?",
      "options": [
        "ক্রিয়া",
        "অব্যয়",
        "বিশেষ্য",
        "বিশেষণ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বিশেষ্য",
      "difficulty": "medium",
      "topic": "পদ"
    },
    {
      "id": "bangla-medium-51",
      "question": "বাংলা ব্যাকরণ: যে পদ বিশেষ্যের দোষ-গুণ বোঝায় তাকে কী বলে?",
      "options": [
        "ক্রিয়া",
        "সর্বনাম",
        "বিশেষণ",
        "অব্যয়"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বিশেষণ",
      "difficulty": "medium",
      "topic": "পদ"
    },
    {
      "id": "bangla-medium-52",
      "question": "বাংলা ব্যাকরণ: যে পদ বিশেষ্যের পরিবর্তে ব্যবহৃত হয় তাকে কী বলে?",
      "options": [
        "সর্বনাম",
        "ক্রিয়া",
        "বিশেষ্য",
        "বিশেষণ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: সর্বনাম",
      "difficulty": "medium",
      "topic": "পদ"
    },
    {
      "id": "bangla-medium-53",
      "question": "বাংলা ব্যাকরণ: বাক্যের যে অংশে কাজ সম্পন্ন হওয়া বোঝায় তাকে কী বলে?",
      "options": [
        "বিধেয়",
        "কারক",
        "উদ্দেশ্য",
        "সমাস"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: বিধেয়",
      "difficulty": "medium",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-medium-54",
      "question": "বাংলা ব্যাকরণ: বাক্যের যার সম্বন্ধে বলা হয় তাকে কী বলে?",
      "options": [
        "উদ্দেশ্য",
        "বিধেয়",
        "প্রত্যয়",
        "অব্যয়"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: উদ্দেশ্য",
      "difficulty": "medium",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-medium-55",
      "question": "বাংলা ব্যাকরণ: সমার্থক শব্দের অর্থ কী?",
      "options": [
        "ধ্বনি শব্দ",
        "বিপরীত শব্দ",
        "একই অর্থবোধক শব্দ",
        "যুক্ত শব্দ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: একই অর্থবোধক শব্দ",
      "difficulty": "medium",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-medium-56",
      "question": "বাংলা ব্যাকরণ: বিপরীত শব্দের অর্থ কী?",
      "options": [
        "প্রবাদ",
        "একই অর্থবোধক শব্দ",
        "বিরুদ্ধ অর্থবোধক শব্দ",
        "যৌগিক শব্দ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বিরুদ্ধ অর্থবোধক শব্দ",
      "difficulty": "medium",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-medium-57",
      "question": "বাংলা ব্যাকরণ: সন্ধি কাকে বলে?",
      "options": [
        "অর্থের পরিবর্তন",
        "ধ্বনির মিলন",
        "শব্দের বিভাজন",
        "বাক্যের বিভাজন"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ধ্বনির মিলন",
      "difficulty": "medium",
      "topic": "সন্ধি"
    },
    {
      "id": "bangla-medium-58",
      "question": "বাংলা ব্যাকরণ: সমাস কাকে বলে?",
      "options": [
        "ক্রিয়ার রূপ",
        "একাধিক পদের মিলনে এক পদ",
        "বর্ণের বিচ্ছেদ",
        "ধ্বনির মিলন"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: একাধিক পদের মিলনে এক পদ",
      "difficulty": "medium",
      "topic": "সমাস"
    },
    {
      "id": "bangla-medium-59",
      "question": "বাংলা ব্যাকরণ: কারক কয় প্রকার?",
      "options": [
        "৭",
        "৫",
        "৪",
        "৬"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ৬",
      "difficulty": "medium",
      "topic": "কারক"
    },
    {
      "id": "bangla-medium-60",
      "question": "বাংলা ব্যাকরণ: বিভক্তি কী?",
      "options": [
        "বর্ণের নাম",
        "উপন্যাসের নাম",
        "পদের সঙ্গে যুক্ত চিহ্ন",
        "ছন্দের নাম"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: পদের সঙ্গে যুক্ত চিহ্ন",
      "difficulty": "medium",
      "topic": "কারক"
    },
    {
      "id": "bangla-medium-61",
      "question": "বাংলা ব্যাকরণ: রূপক অলংকার কোন ধরনের অলংকার?",
      "options": [
        "ছন্দ",
        "শব্দালংকার",
        "অর্থালংকার",
        "বর্ণালংকার"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: অর্থালংকার",
      "difficulty": "medium",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-medium-62",
      "question": "বাংলা ব্যাকরণ: অনুপ্রাস কোন ধরনের অলংকার?",
      "options": [
        "শব্দালংকার",
        "কারক",
        "সমাস",
        "অর্থালংকার"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: শব্দালংকার",
      "difficulty": "medium",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-medium-63",
      "question": "বাংলা ব্যাকরণ: বাংলা ভাষার আদি নিদর্শন কোনটি?",
      "options": [
        "চর্যাপদ",
        "কপালকুণ্ডলা",
        "গীতাঞ্জলি",
        "মেঘনাদবধ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: চর্যাপদ",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-64",
      "question": "বাংলা ব্যাকরণ: চর্যাপদ কোন যুগের সাহিত্য?",
      "options": [
        "আধুনিক যুগ",
        "মধ্যযুগ",
        "প্রাচীন যুগ",
        "উত্তর আধুনিক"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: প্রাচীন যুগ",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-65",
      "question": "বাংলা ব্যাকরণ: কপালকুণ্ডলা কার লেখা?",
      "options": [
        "রবীন্দ্রনাথ",
        "নজরুল",
        "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
        "শরৎচন্দ্র"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "medium",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-medium-66",
      "question": "বাংলা ব্যাকরণ: দেবদাস কার লেখা?",
      "options": [
        "মাইকেল",
        "শরৎচন্দ্র চট্টোপাধ্যায়",
        "রবীন্দ্রনাথ",
        "বঙ্কিমচন্দ্র"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: শরৎচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "medium",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-medium-67",
      "question": "বাংলা ব্যাকরণ: বাংলা ভাষার লিপি কোনটি?",
      "options": [
        "রোমান লিপি",
        "আরবি লিপি",
        "দেবনাগরী",
        "বাংলা লিপি"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: বাংলা লিপি",
      "difficulty": "medium",
      "topic": "ভাষা"
    },
    {
      "id": "bangla-medium-68",
      "question": "বাংলা ব্যাকরণ: ধ্বনি কাকে বলে?",
      "options": [
        "বাক্যের অর্থ",
        "সমাসের রূপ",
        "লিখিত চিহ্ন",
        "উচ্চারিত শব্দের ক্ষুদ্রতম একক"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: উচ্চারিত শব্দের ক্ষুদ্রতম একক",
      "difficulty": "medium",
      "topic": "ধ্বনি"
    },
    {
      "id": "bangla-medium-69",
      "question": "বাংলা ব্যাকরণ: বর্ণ কাকে বলে?",
      "options": [
        "ছন্দের মাত্রা",
        "বাক্যের উদ্দেশ্য",
        "ধ্বনির লিখিত রূপ",
        "শব্দের অর্থ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: ধ্বনির লিখিত রূপ",
      "difficulty": "medium",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-medium-70",
      "question": "বাংলা ব্যাকরণ: বাক্য কাকে বলে?",
      "options": [
        "শুধু বর্ণ",
        "অর্থহীন শব্দ",
        "একটি ধ্বনি",
        "পূর্ণ অর্থবোধক শব্দসমষ্টি"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: পূর্ণ অর্থবোধক শব্দসমষ্টি",
      "difficulty": "medium",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-medium-71",
      "question": "বাংলা ব্যাকরণ: প্রত্যয় কাকে বলে?",
      "options": [
        "ধ্বনির মিলন",
        "শব্দের আগে যুক্ত অংশ",
        "শব্দের শেষে যুক্ত অংশ",
        "বাক্যের শুরু"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: শব্দের শেষে যুক্ত অংশ",
      "difficulty": "medium",
      "topic": "প্রত্যয়"
    },
    {
      "id": "bangla-medium-72",
      "question": "বাংলা ব্যাকরণ: উপসর্গ কাকে বলে?",
      "options": [
        "শব্দের শেষে যুক্ত অংশ",
        "বাক্যের শেষে",
        "শব্দের আগে যুক্ত অংশ",
        "সমাসের নাম"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: শব্দের আগে যুক্ত অংশ",
      "difficulty": "medium",
      "topic": "উপসর্গ"
    },
    {
      "id": "bangla-medium-73",
      "question": "বাংলা ব্যাকরণ: লোকসাহিত্য কী?",
      "options": [
        "শুধু লিখিত আইন",
        "শুধু বিজ্ঞান বই",
        "জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
        "শুধু সংবাদ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-74",
      "question": "বাংলা ব্যাকরণ: প্রবাদ কী?",
      "options": [
        "লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি",
        "একটি বর্ণ",
        "কারকের চিহ্ন",
        "ধ্বনির নাম"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি",
      "difficulty": "medium",
      "topic": "প্রবাদ"
    },
    {
      "id": "bangla-medium-75",
      "question": "বাংলা ব্যাকরণ: বাগধারা কী?",
      "options": [
        "শুধু নাম",
        "শুধু একটি ধ্বনি",
        "শুধু সংখ্যা",
        "বিশেষ অর্থবোধক শব্দগুচ্ছ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: বিশেষ অর্থবোধক শব্দগুচ্ছ",
      "difficulty": "medium",
      "topic": "বাগধারা"
    },
    {
      "id": "bangla-medium-76",
      "question": "বাংলা ব্যাকরণ: বাংলা সাহিত্যে সনেট প্রবর্তন করেন কে?",
      "options": [
        "শরৎচন্দ্র",
        "নজরুল",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-77",
      "question": "বাংলা ব্যাকরণ: বিদ্রোহী কবিতা কার লেখা?",
      "options": [
        "মাইকেল",
        "জসীমউদ্দীন",
        "কাজী নজরুল ইসলাম",
        "রবীন্দ্রনাথ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "medium",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-medium-78",
      "question": "বাংলা ব্যাকরণ: সোনার তরী কার কাব্যগ্রন্থ?",
      "options": [
        "রবীন্দ্রনাথ ঠাকুর",
        "জসীমউদ্দীন",
        "নজরুল",
        "মাইকেল"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "medium",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-medium-79",
      "question": "বাংলা ব্যাকরণ: পল্লীকবি নামে পরিচিত কে?",
      "options": [
        "রবীন্দ্রনাথ",
        "নজরুল",
        "জসীমউদ্দীন",
        "মাইকেল"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "medium",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-medium-80",
      "question": "বাংলা ব্যাকরণ: অমিত্রাক্ষর ছন্দ বাংলা সাহিত্যে কে প্রবর্তন করেন?",
      "options": [
        "নজরুল",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ",
        "সুকান্ত"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "medium",
      "topic": "ছন্দ"
    },
    {
      "id": "bangla-hard-81",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা বর্ণমালায় স্বরবর্ণ কয়টি?",
      "options": [
        "১২",
        "১১",
        "১৩",
        "১০"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: ১১",
      "difficulty": "hard",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-hard-82",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা বর্ণমালায় ব্যঞ্জনবর্ণ কয়টি?",
      "options": [
        "৩৭",
        "৩৫",
        "৪১",
        "৩৯"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ৩৯",
      "difficulty": "hard",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-hard-83",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা ভাষার জাতীয় কবি কে?",
      "options": [
        "কাজী নজরুল ইসলাম",
        "জসীমউদ্দীন",
        "রবীন্দ্রনাথ ঠাকুর",
        "সুকান্ত ভট্টাচার্য"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-84",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা সাহিত্যের প্রথম মহাকাব্য কোনটি?",
      "options": [
        "গীতাঞ্জলি",
        "সোনার তরী",
        "নক্সী কাঁথার মাঠ",
        "মেঘনাদবধ কাব্য"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: মেঘনাদবধ কাব্য",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-85",
      "question": "পরীক্ষা প্রস্তুতি: মেঘনাদবধ কাব্যের রচয়িতা কে?",
      "options": [
        "কাজী নজরুল ইসলাম",
        "বঙ্কিমচন্দ্র",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ ঠাকুর"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-86",
      "question": "পরীক্ষা প্রস্তুতি: গীতাঞ্জলির রচয়িতা কে?",
      "options": [
        "রবীন্দ্রনাথ ঠাকুর",
        "নজরুল",
        "জসীমউদ্দীন",
        "শরৎচন্দ্র"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-87",
      "question": "পরীক্ষা প্রস্তুতি: নক্সী কাঁথার মাঠ কার লেখা?",
      "options": [
        "রবীন্দ্রনাথ",
        "মাইকেল",
        "নজরুল",
        "জসীমউদ্দীন"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-88",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা ব্যাকরণে শব্দের ক্ষুদ্রতম অর্থপূর্ণ একক কী?",
      "options": [
        "বর্ণ",
        "বাক্য",
        "রূপিম",
        "ধ্বনি"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: রূপিম",
      "difficulty": "hard",
      "topic": "ব্যাকরণ"
    },
    {
      "id": "bangla-hard-89",
      "question": "পরীক্ষা প্রস্তুতি: যে শব্দ ক্রিয়ার কাজ বোঝায় তাকে কী বলে?",
      "options": [
        "বিশেষ্য",
        "সর্বনাম",
        "ক্রিয়া",
        "বিশেষণ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: ক্রিয়া",
      "difficulty": "hard",
      "topic": "পদ"
    },
    {
      "id": "bangla-hard-90",
      "question": "পরীক্ষা প্রস্তুতি: যে পদ নাম বোঝায় তাকে কী বলে?",
      "options": [
        "ক্রিয়া",
        "বিশেষ্য",
        "বিশেষণ",
        "অব্যয়"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বিশেষ্য",
      "difficulty": "hard",
      "topic": "পদ"
    },
    {
      "id": "bangla-hard-91",
      "question": "পরীক্ষা প্রস্তুতি: যে পদ বিশেষ্যের দোষ-গুণ বোঝায় তাকে কী বলে?",
      "options": [
        "ক্রিয়া",
        "বিশেষণ",
        "অব্যয়",
        "সর্বনাম"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বিশেষণ",
      "difficulty": "hard",
      "topic": "পদ"
    },
    {
      "id": "bangla-hard-92",
      "question": "পরীক্ষা প্রস্তুতি: যে পদ বিশেষ্যের পরিবর্তে ব্যবহৃত হয় তাকে কী বলে?",
      "options": [
        "ক্রিয়া",
        "সর্বনাম",
        "বিশেষণ",
        "বিশেষ্য"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: সর্বনাম",
      "difficulty": "hard",
      "topic": "পদ"
    },
    {
      "id": "bangla-hard-93",
      "question": "পরীক্ষা প্রস্তুতি: বাক্যের যে অংশে কাজ সম্পন্ন হওয়া বোঝায় তাকে কী বলে?",
      "options": [
        "সমাস",
        "উদ্দেশ্য",
        "বিধেয়",
        "কারক"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: বিধেয়",
      "difficulty": "hard",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-hard-94",
      "question": "পরীক্ষা প্রস্তুতি: বাক্যের যার সম্বন্ধে বলা হয় তাকে কী বলে?",
      "options": [
        "প্রত্যয়",
        "উদ্দেশ্য",
        "অব্যয়",
        "বিধেয়"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: উদ্দেশ্য",
      "difficulty": "hard",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-hard-95",
      "question": "পরীক্ষা প্রস্তুতি: সমার্থক শব্দের অর্থ কী?",
      "options": [
        "একই অর্থবোধক শব্দ",
        "বিপরীত শব্দ",
        "ধ্বনি শব্দ",
        "যুক্ত শব্দ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: একই অর্থবোধক শব্দ",
      "difficulty": "hard",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-hard-96",
      "question": "পরীক্ষা প্রস্তুতি: বিপরীত শব্দের অর্থ কী?",
      "options": [
        "একই অর্থবোধক শব্দ",
        "বিরুদ্ধ অর্থবোধক শব্দ",
        "যৌগিক শব্দ",
        "প্রবাদ"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বিরুদ্ধ অর্থবোধক শব্দ",
      "difficulty": "hard",
      "topic": "শব্দার্থ"
    },
    {
      "id": "bangla-hard-97",
      "question": "পরীক্ষা প্রস্তুতি: সন্ধি কাকে বলে?",
      "options": [
        "অর্থের পরিবর্তন",
        "শব্দের বিভাজন",
        "বাক্যের বিভাজন",
        "ধ্বনির মিলন"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ধ্বনির মিলন",
      "difficulty": "hard",
      "topic": "সন্ধি"
    },
    {
      "id": "bangla-hard-98",
      "question": "পরীক্ষা প্রস্তুতি: সমাস কাকে বলে?",
      "options": [
        "বর্ণের বিচ্ছেদ",
        "ধ্বনির মিলন",
        "ক্রিয়ার রূপ",
        "একাধিক পদের মিলনে এক পদ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: একাধিক পদের মিলনে এক পদ",
      "difficulty": "hard",
      "topic": "সমাস"
    },
    {
      "id": "bangla-hard-99",
      "question": "পরীক্ষা প্রস্তুতি: কারক কয় প্রকার?",
      "options": [
        "৫",
        "৭",
        "৬",
        "৪"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: ৬",
      "difficulty": "hard",
      "topic": "কারক"
    },
    {
      "id": "bangla-hard-100",
      "question": "পরীক্ষা প্রস্তুতি: বিভক্তি কী?",
      "options": [
        "ছন্দের নাম",
        "পদের সঙ্গে যুক্ত চিহ্ন",
        "বর্ণের নাম",
        "উপন্যাসের নাম"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: পদের সঙ্গে যুক্ত চিহ্ন",
      "difficulty": "hard",
      "topic": "কারক"
    },
    {
      "id": "bangla-hard-101",
      "question": "পরীক্ষা প্রস্তুতি: রূপক অলংকার কোন ধরনের অলংকার?",
      "options": [
        "অর্থালংকার",
        "ছন্দ",
        "শব্দালংকার",
        "বর্ণালংকার"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: অর্থালংকার",
      "difficulty": "hard",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-hard-102",
      "question": "পরীক্ষা প্রস্তুতি: অনুপ্রাস কোন ধরনের অলংকার?",
      "options": [
        "শব্দালংকার",
        "কারক",
        "সমাস",
        "অর্থালংকার"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: শব্দালংকার",
      "difficulty": "hard",
      "topic": "অলংকার"
    },
    {
      "id": "bangla-hard-103",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা ভাষার আদি নিদর্শন কোনটি?",
      "options": [
        "মেঘনাদবধ",
        "গীতাঞ্জলি",
        "চর্যাপদ",
        "কপালকুণ্ডলা"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: চর্যাপদ",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-104",
      "question": "পরীক্ষা প্রস্তুতি: চর্যাপদ কোন যুগের সাহিত্য?",
      "options": [
        "উত্তর আধুনিক",
        "মধ্যযুগ",
        "আধুনিক যুগ",
        "প্রাচীন যুগ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: প্রাচীন যুগ",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-105",
      "question": "পরীক্ষা প্রস্তুতি: কপালকুণ্ডলা কার লেখা?",
      "options": [
        "নজরুল",
        "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
        "রবীন্দ্রনাথ",
        "শরৎচন্দ্র"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "hard",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-hard-106",
      "question": "পরীক্ষা প্রস্তুতি: দেবদাস কার লেখা?",
      "options": [
        "রবীন্দ্রনাথ",
        "মাইকেল",
        "বঙ্কিমচন্দ্র",
        "শরৎচন্দ্র চট্টোপাধ্যায়"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: শরৎচন্দ্র চট্টোপাধ্যায়",
      "difficulty": "hard",
      "topic": "উপন্যাস"
    },
    {
      "id": "bangla-hard-107",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা ভাষার লিপি কোনটি?",
      "options": [
        "রোমান লিপি",
        "বাংলা লিপি",
        "আরবি লিপি",
        "দেবনাগরী"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বাংলা লিপি",
      "difficulty": "hard",
      "topic": "ভাষা"
    },
    {
      "id": "bangla-hard-108",
      "question": "পরীক্ষা প্রস্তুতি: ধ্বনি কাকে বলে?",
      "options": [
        "উচ্চারিত শব্দের ক্ষুদ্রতম একক",
        "বাক্যের অর্থ",
        "লিখিত চিহ্ন",
        "সমাসের রূপ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: উচ্চারিত শব্দের ক্ষুদ্রতম একক",
      "difficulty": "hard",
      "topic": "ধ্বনি"
    },
    {
      "id": "bangla-hard-109",
      "question": "পরীক্ষা প্রস্তুতি: বর্ণ কাকে বলে?",
      "options": [
        "শব্দের অর্থ",
        "বাক্যের উদ্দেশ্য",
        "ছন্দের মাত্রা",
        "ধ্বনির লিখিত রূপ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: ধ্বনির লিখিত রূপ",
      "difficulty": "hard",
      "topic": "বর্ণ"
    },
    {
      "id": "bangla-hard-110",
      "question": "পরীক্ষা প্রস্তুতি: বাক্য কাকে বলে?",
      "options": [
        "পূর্ণ অর্থবোধক শব্দসমষ্টি",
        "একটি ধ্বনি",
        "অর্থহীন শব্দ",
        "শুধু বর্ণ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: পূর্ণ অর্থবোধক শব্দসমষ্টি",
      "difficulty": "hard",
      "topic": "বাক্য"
    },
    {
      "id": "bangla-hard-111",
      "question": "পরীক্ষা প্রস্তুতি: প্রত্যয় কাকে বলে?",
      "options": [
        "শব্দের আগে যুক্ত অংশ",
        "ধ্বনির মিলন",
        "শব্দের শেষে যুক্ত অংশ",
        "বাক্যের শুরু"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: শব্দের শেষে যুক্ত অংশ",
      "difficulty": "hard",
      "topic": "প্রত্যয়"
    },
    {
      "id": "bangla-hard-112",
      "question": "পরীক্ষা প্রস্তুতি: উপসর্গ কাকে বলে?",
      "options": [
        "বাক্যের শেষে",
        "শব্দের শেষে যুক্ত অংশ",
        "সমাসের নাম",
        "শব্দের আগে যুক্ত অংশ"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: শব্দের আগে যুক্ত অংশ",
      "difficulty": "hard",
      "topic": "উপসর্গ"
    },
    {
      "id": "bangla-hard-113",
      "question": "পরীক্ষা প্রস্তুতি: লোকসাহিত্য কী?",
      "options": [
        "জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
        "শুধু লিখিত আইন",
        "শুধু বিজ্ঞান বই",
        "শুধু সংবাদ"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: জনসাধারণের মুখে মুখে প্রচলিত সাহিত্য",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-114",
      "question": "পরীক্ষা প্রস্তুতি: প্রবাদ কী?",
      "options": [
        "একটি বর্ণ",
        "ধ্বনির নাম",
        "কারকের চিহ্ন",
        "লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: লোকমুখে প্রচলিত অর্থপূর্ণ উক্তি",
      "difficulty": "hard",
      "topic": "প্রবাদ"
    },
    {
      "id": "bangla-hard-115",
      "question": "পরীক্ষা প্রস্তুতি: বাগধারা কী?",
      "options": [
        "শুধু একটি ধ্বনি",
        "বিশেষ অর্থবোধক শব্দগুচ্ছ",
        "শুধু নাম",
        "শুধু সংখ্যা"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: বিশেষ অর্থবোধক শব্দগুচ্ছ",
      "difficulty": "hard",
      "topic": "বাগধারা"
    },
    {
      "id": "bangla-hard-116",
      "question": "পরীক্ষা প্রস্তুতি: বাংলা সাহিত্যে সনেট প্রবর্তন করেন কে?",
      "options": [
        "শরৎচন্দ্র",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ",
        "নজরুল"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-117",
      "question": "পরীক্ষা প্রস্তুতি: বিদ্রোহী কবিতা কার লেখা?",
      "options": [
        "কাজী নজরুল ইসলাম",
        "মাইকেল",
        "রবীন্দ্রনাথ",
        "জসীমউদ্দীন"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: কাজী নজরুল ইসলাম",
      "difficulty": "hard",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-hard-118",
      "question": "পরীক্ষা প্রস্তুতি: সোনার তরী কার কাব্যগ্রন্থ?",
      "options": [
        "নজরুল",
        "জসীমউদ্দীন",
        "মাইকেল",
        "রবীন্দ্রনাথ ঠাকুর"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: রবীন্দ্রনাথ ঠাকুর",
      "difficulty": "hard",
      "topic": "কবিতা"
    },
    {
      "id": "bangla-hard-119",
      "question": "পরীক্ষা প্রস্তুতি: পল্লীকবি নামে পরিচিত কে?",
      "options": [
        "জসীমউদ্দীন",
        "মাইকেল",
        "রবীন্দ্রনাথ",
        "নজরুল"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: জসীমউদ্দীন",
      "difficulty": "hard",
      "topic": "সাহিত্য"
    },
    {
      "id": "bangla-hard-120",
      "question": "পরীক্ষা প্রস্তুতি: অমিত্রাক্ষর ছন্দ বাংলা সাহিত্যে কে প্রবর্তন করেন?",
      "options": [
        "নজরুল",
        "সুকান্ত",
        "মাইকেল মধুসূদন দত্ত",
        "রবীন্দ্রনাথ"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: মাইকেল মধুসূদন দত্ত",
      "difficulty": "hard",
      "topic": "ছন্দ"
    }
  ],
  "gk": [
    {
      "id": "gk-easy-1",
      "question": "What is the capital of Bangladesh?",
      "options": [
        "Dhaka",
        "Rajshahi",
        "Khulna",
        "Sylhet"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Dhaka",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-2",
      "question": "What is the national flower of Bangladesh?",
      "options": [
        "Sunflower",
        "Lotus",
        "Water lily",
        "Rose"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Water lily",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-3",
      "question": "What is the national fish of Bangladesh?",
      "options": [
        "Hilsa",
        "Katla",
        "Rui",
        "Pangash"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Hilsa",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-4",
      "question": "What is the national animal of Bangladesh?",
      "options": [
        "Lion",
        "Royal Bengal Tiger",
        "Deer",
        "Elephant"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Royal Bengal Tiger",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-5",
      "question": "What is the national bird of Bangladesh?",
      "options": [
        "Kingfisher",
        "Magpie robin",
        "Crow",
        "Sparrow"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Magpie robin",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-6",
      "question": "What is the currency of Bangladesh?",
      "options": [
        "Rupee",
        "Taka",
        "Dollar",
        "Riyal"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Taka",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-7",
      "question": "Which city is known as the port city of Bangladesh?",
      "options": [
        "Dhaka",
        "Sylhet",
        "Chittagong",
        "Rangpur"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Chittagong",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-8",
      "question": "What is the largest mangrove forest in the world?",
      "options": [
        "Taiga",
        "Amazon",
        "Sundarbans",
        "Congo"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sundarbans",
      "difficulty": "easy",
      "topic": "Geography"
    },
    {
      "id": "gk-easy-9",
      "question": "Which river is known as Padma in Bangladesh?",
      "options": [
        "Ganges",
        "Brahmaputra",
        "Meghna",
        "Jamuna"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Ganges",
      "difficulty": "easy",
      "topic": "Geography"
    },
    {
      "id": "gk-easy-10",
      "question": "Which is the longest sea beach in Bangladesh?",
      "options": [
        "Cox's Bazar",
        "Saint Martin",
        "Kuakata",
        "Patenga"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cox's Bazar",
      "difficulty": "easy",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-easy-11",
      "question": "How many continents are there?",
      "options": [
        "5",
        "7",
        "6",
        "8"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 7",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-12",
      "question": "Which is the largest continent?",
      "options": [
        "Australia",
        "Asia",
        "Africa",
        "Europe"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Asia",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-13",
      "question": "Which is the smallest continent?",
      "options": [
        "Antarctica",
        "Australia",
        "Europe",
        "South America"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Australia",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-14",
      "question": "Which is the largest ocean?",
      "options": [
        "Pacific Ocean",
        "Indian Ocean",
        "Atlantic Ocean",
        "Arctic Ocean"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Pacific Ocean",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-15",
      "question": "Which planet is known as the Red Planet?",
      "options": [
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mars",
      "difficulty": "easy",
      "topic": "Space"
    },
    {
      "id": "gk-easy-16",
      "question": "Which is the largest planet?",
      "options": [
        "Jupiter",
        "Venus",
        "Earth",
        "Mars"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Jupiter",
      "difficulty": "easy",
      "topic": "Space"
    },
    {
      "id": "gk-easy-17",
      "question": "Which planet is closest to the Sun?",
      "options": [
        "Earth",
        "Mercury",
        "Venus",
        "Mars"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mercury",
      "difficulty": "easy",
      "topic": "Space"
    },
    {
      "id": "gk-easy-18",
      "question": "Who invented the telephone?",
      "options": [
        "Einstein",
        "Alexander Graham Bell",
        "Newton",
        "Thomas Edison"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Alexander Graham Bell",
      "difficulty": "easy",
      "topic": "Invention"
    },
    {
      "id": "gk-easy-19",
      "question": "Who discovered penicillin?",
      "options": [
        "Newton",
        "Marie Curie",
        "Louis Pasteur",
        "Alexander Fleming"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Alexander Fleming",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-20",
      "question": "Who proposed the theory of relativity?",
      "options": [
        "Albert Einstein",
        "Galileo",
        "Tesla",
        "Isaac Newton"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Albert Einstein",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-21",
      "question": "Who is known as the father of computer?",
      "options": [
        "Steve Jobs",
        "Bill Gates",
        "Alan Turing",
        "Charles Babbage"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Charles Babbage",
      "difficulty": "easy",
      "topic": "ICT"
    },
    {
      "id": "gk-easy-22",
      "question": "What does UN stand for?",
      "options": [
        "United Nations",
        "Universal Network",
        "United Navy",
        "Union Nation"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: United Nations",
      "difficulty": "easy",
      "topic": "Organization"
    },
    {
      "id": "gk-easy-23",
      "question": "What does WHO stand for?",
      "options": [
        "Wide Health Order",
        "World Health Organization",
        "World Help Organization",
        "World Human Office"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: World Health Organization",
      "difficulty": "easy",
      "topic": "Organization"
    },
    {
      "id": "gk-easy-24",
      "question": "What does UNESCO work mainly for?",
      "options": [
        "Only banking",
        "Education, science and culture",
        "Only military",
        "Only sports"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Education, science and culture",
      "difficulty": "easy",
      "topic": "Organization"
    },
    {
      "id": "gk-easy-25",
      "question": "Which country hosted FIFA World Cup 2022?",
      "options": [
        "Qatar",
        "Brazil",
        "Russia",
        "France"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Qatar",
      "difficulty": "easy",
      "topic": "Sports"
    },
    {
      "id": "gk-easy-26",
      "question": "How many players are in a football team on field?",
      "options": [
        "11",
        "10",
        "9",
        "12"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 11",
      "difficulty": "easy",
      "topic": "Sports"
    },
    {
      "id": "gk-easy-27",
      "question": "How many players are in a cricket team?",
      "options": [
        "12",
        "9",
        "10",
        "11"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 11",
      "difficulty": "easy",
      "topic": "Sports"
    },
    {
      "id": "gk-easy-28",
      "question": "Olympic Games are held every how many years?",
      "options": [
        "3 years",
        "2 years",
        "5 years",
        "4 years"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 4 years",
      "difficulty": "easy",
      "topic": "Sports"
    },
    {
      "id": "gk-easy-29",
      "question": "Which gas do humans mainly inhale for respiration?",
      "options": [
        "Hydrogen",
        "Oxygen",
        "Nitrogen only",
        "Carbon dioxide"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-30",
      "question": "Which gas do plants absorb for photosynthesis?",
      "options": [
        "Carbon dioxide",
        "Hydrogen",
        "Oxygen",
        "Helium"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-31",
      "question": "What is the hardest natural substance?",
      "options": [
        "Iron",
        "Gold",
        "Silver",
        "Diamond"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Diamond",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-32",
      "question": "Which organ purifies blood in human body?",
      "options": [
        "Heart",
        "Stomach",
        "Kidney",
        "Lung"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Kidney",
      "difficulty": "easy",
      "topic": "Science"
    },
    {
      "id": "gk-easy-33",
      "question": "Which country is called the Land of the Rising Sun?",
      "options": [
        "Japan",
        "Korea",
        "China",
        "Thailand"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Japan",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-34",
      "question": "Which is the capital of India?",
      "options": [
        "Mumbai",
        "New Delhi",
        "Kolkata",
        "Chennai"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: New Delhi",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-35",
      "question": "Which is the capital of the USA?",
      "options": [
        "Chicago",
        "New York",
        "Washington, D.C.",
        "Los Angeles"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Washington, D.C.",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-36",
      "question": "Which is the capital of the UK?",
      "options": [
        "Bristol",
        "Liverpool",
        "Manchester",
        "London"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: London",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-37",
      "question": "Which is the capital of France?",
      "options": [
        "Rome",
        "Madrid",
        "Berlin",
        "Paris"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Paris",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-38",
      "question": "Which is the capital of Japan?",
      "options": [
        "Tokyo",
        "Seoul",
        "Osaka",
        "Kyoto"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Tokyo",
      "difficulty": "easy",
      "topic": "World"
    },
    {
      "id": "gk-easy-39",
      "question": "Which mountain is the highest in the world?",
      "options": [
        "Kangchenjunga",
        "K2",
        "Mount Everest",
        "Makalu"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mount Everest",
      "difficulty": "easy",
      "topic": "Geography"
    },
    {
      "id": "gk-easy-40",
      "question": "Which desert is the largest hot desert?",
      "options": [
        "Kalahari",
        "Sahara",
        "Gobi",
        "Thar"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Sahara",
      "difficulty": "easy",
      "topic": "Geography"
    },
    {
      "id": "gk-medium-41",
      "question": "General knowledge: What is the capital of Bangladesh?",
      "options": [
        "Dhaka",
        "Khulna",
        "Sylhet",
        "Rajshahi"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Dhaka",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-42",
      "question": "General knowledge: What is the national flower of Bangladesh?",
      "options": [
        "Sunflower",
        "Rose",
        "Water lily",
        "Lotus"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Water lily",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-43",
      "question": "General knowledge: What is the national fish of Bangladesh?",
      "options": [
        "Rui",
        "Pangash",
        "Katla",
        "Hilsa"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Hilsa",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-44",
      "question": "General knowledge: What is the national animal of Bangladesh?",
      "options": [
        "Elephant",
        "Lion",
        "Deer",
        "Royal Bengal Tiger"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Royal Bengal Tiger",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-45",
      "question": "General knowledge: What is the national bird of Bangladesh?",
      "options": [
        "Kingfisher",
        "Magpie robin",
        "Sparrow",
        "Crow"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Magpie robin",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-46",
      "question": "General knowledge: What is the currency of Bangladesh?",
      "options": [
        "Riyal",
        "Taka",
        "Dollar",
        "Rupee"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Taka",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-47",
      "question": "General knowledge: Which city is known as the port city of Bangladesh?",
      "options": [
        "Chittagong",
        "Dhaka",
        "Rangpur",
        "Sylhet"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Chittagong",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-48",
      "question": "General knowledge: What is the largest mangrove forest in the world?",
      "options": [
        "Congo",
        "Amazon",
        "Sundarbans",
        "Taiga"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sundarbans",
      "difficulty": "medium",
      "topic": "Geography"
    },
    {
      "id": "gk-medium-49",
      "question": "General knowledge: Which river is known as Padma in Bangladesh?",
      "options": [
        "Jamuna",
        "Meghna",
        "Ganges",
        "Brahmaputra"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Ganges",
      "difficulty": "medium",
      "topic": "Geography"
    },
    {
      "id": "gk-medium-50",
      "question": "General knowledge: Which is the longest sea beach in Bangladesh?",
      "options": [
        "Kuakata",
        "Patenga",
        "Cox's Bazar",
        "Saint Martin"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Cox's Bazar",
      "difficulty": "medium",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-medium-51",
      "question": "General knowledge: How many continents are there?",
      "options": [
        "7",
        "5",
        "6",
        "8"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 7",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-52",
      "question": "General knowledge: Which is the largest continent?",
      "options": [
        "Africa",
        "Europe",
        "Asia",
        "Australia"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Asia",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-53",
      "question": "General knowledge: Which is the smallest continent?",
      "options": [
        "Antarctica",
        "Australia",
        "South America",
        "Europe"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Australia",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-54",
      "question": "General knowledge: Which is the largest ocean?",
      "options": [
        "Atlantic Ocean",
        "Arctic Ocean",
        "Indian Ocean",
        "Pacific Ocean"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Pacific Ocean",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-55",
      "question": "General knowledge: Which planet is known as the Red Planet?",
      "options": [
        "Saturn",
        "Mars",
        "Venus",
        "Jupiter"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mars",
      "difficulty": "medium",
      "topic": "Space"
    },
    {
      "id": "gk-medium-56",
      "question": "General knowledge: Which is the largest planet?",
      "options": [
        "Mars",
        "Earth",
        "Jupiter",
        "Venus"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Jupiter",
      "difficulty": "medium",
      "topic": "Space"
    },
    {
      "id": "gk-medium-57",
      "question": "General knowledge: Which planet is closest to the Sun?",
      "options": [
        "Mercury",
        "Venus",
        "Earth",
        "Mars"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Mercury",
      "difficulty": "medium",
      "topic": "Space"
    },
    {
      "id": "gk-medium-58",
      "question": "General knowledge: Who invented the telephone?",
      "options": [
        "Alexander Graham Bell",
        "Thomas Edison",
        "Newton",
        "Einstein"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Alexander Graham Bell",
      "difficulty": "medium",
      "topic": "Invention"
    },
    {
      "id": "gk-medium-59",
      "question": "General knowledge: Who discovered penicillin?",
      "options": [
        "Newton",
        "Louis Pasteur",
        "Marie Curie",
        "Alexander Fleming"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Alexander Fleming",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-60",
      "question": "General knowledge: Who proposed the theory of relativity?",
      "options": [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo",
        "Tesla"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Albert Einstein",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-61",
      "question": "General knowledge: Who is known as the father of computer?",
      "options": [
        "Alan Turing",
        "Charles Babbage",
        "Steve Jobs",
        "Bill Gates"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Charles Babbage",
      "difficulty": "medium",
      "topic": "ICT"
    },
    {
      "id": "gk-medium-62",
      "question": "General knowledge: What does UN stand for?",
      "options": [
        "United Navy",
        "United Nations",
        "Universal Network",
        "Union Nation"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: United Nations",
      "difficulty": "medium",
      "topic": "Organization"
    },
    {
      "id": "gk-medium-63",
      "question": "General knowledge: What does WHO stand for?",
      "options": [
        "Wide Health Order",
        "World Health Organization",
        "World Help Organization",
        "World Human Office"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: World Health Organization",
      "difficulty": "medium",
      "topic": "Organization"
    },
    {
      "id": "gk-medium-64",
      "question": "General knowledge: What does UNESCO work mainly for?",
      "options": [
        "Only banking",
        "Education, science and culture",
        "Only sports",
        "Only military"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Education, science and culture",
      "difficulty": "medium",
      "topic": "Organization"
    },
    {
      "id": "gk-medium-65",
      "question": "General knowledge: Which country hosted FIFA World Cup 2022?",
      "options": [
        "Russia",
        "Qatar",
        "Brazil",
        "France"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Qatar",
      "difficulty": "medium",
      "topic": "Sports"
    },
    {
      "id": "gk-medium-66",
      "question": "General knowledge: How many players are in a football team on field?",
      "options": [
        "9",
        "11",
        "10",
        "12"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 11",
      "difficulty": "medium",
      "topic": "Sports"
    },
    {
      "id": "gk-medium-67",
      "question": "General knowledge: How many players are in a cricket team?",
      "options": [
        "10",
        "11",
        "12",
        "9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 11",
      "difficulty": "medium",
      "topic": "Sports"
    },
    {
      "id": "gk-medium-68",
      "question": "General knowledge: Olympic Games are held every how many years?",
      "options": [
        "4 years",
        "3 years",
        "5 years",
        "2 years"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 4 years",
      "difficulty": "medium",
      "topic": "Sports"
    },
    {
      "id": "gk-medium-69",
      "question": "General knowledge: Which gas do humans mainly inhale for respiration?",
      "options": [
        "Nitrogen only",
        "Hydrogen",
        "Oxygen",
        "Carbon dioxide"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-70",
      "question": "General knowledge: Which gas do plants absorb for photosynthesis?",
      "options": [
        "Oxygen",
        "Carbon dioxide",
        "Hydrogen",
        "Helium"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-71",
      "question": "General knowledge: What is the hardest natural substance?",
      "options": [
        "Silver",
        "Iron",
        "Diamond",
        "Gold"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Diamond",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-72",
      "question": "General knowledge: Which organ purifies blood in human body?",
      "options": [
        "Lung",
        "Stomach",
        "Kidney",
        "Heart"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Kidney",
      "difficulty": "medium",
      "topic": "Science"
    },
    {
      "id": "gk-medium-73",
      "question": "General knowledge: Which country is called the Land of the Rising Sun?",
      "options": [
        "Japan",
        "Korea",
        "China",
        "Thailand"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Japan",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-74",
      "question": "General knowledge: Which is the capital of India?",
      "options": [
        "New Delhi",
        "Mumbai",
        "Kolkata",
        "Chennai"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: New Delhi",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-75",
      "question": "General knowledge: Which is the capital of the USA?",
      "options": [
        "New York",
        "Los Angeles",
        "Washington, D.C.",
        "Chicago"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Washington, D.C.",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-76",
      "question": "General knowledge: Which is the capital of the UK?",
      "options": [
        "Liverpool",
        "Manchester",
        "Bristol",
        "London"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: London",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-77",
      "question": "General knowledge: Which is the capital of France?",
      "options": [
        "Madrid",
        "Berlin",
        "Rome",
        "Paris"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Paris",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-78",
      "question": "General knowledge: Which is the capital of Japan?",
      "options": [
        "Seoul",
        "Osaka",
        "Tokyo",
        "Kyoto"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Tokyo",
      "difficulty": "medium",
      "topic": "World"
    },
    {
      "id": "gk-medium-79",
      "question": "General knowledge: Which mountain is the highest in the world?",
      "options": [
        "K2",
        "Mount Everest",
        "Kangchenjunga",
        "Makalu"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Mount Everest",
      "difficulty": "medium",
      "topic": "Geography"
    },
    {
      "id": "gk-medium-80",
      "question": "General knowledge: Which desert is the largest hot desert?",
      "options": [
        "Kalahari",
        "Thar",
        "Gobi",
        "Sahara"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Sahara",
      "difficulty": "medium",
      "topic": "Geography"
    },
    {
      "id": "gk-hard-81",
      "question": "Competitive GK: What is the capital of Bangladesh?",
      "options": [
        "Rajshahi",
        "Khulna",
        "Sylhet",
        "Dhaka"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Dhaka",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-82",
      "question": "Competitive GK: What is the national flower of Bangladesh?",
      "options": [
        "Lotus",
        "Water lily",
        "Sunflower",
        "Rose"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Water lily",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-83",
      "question": "Competitive GK: What is the national fish of Bangladesh?",
      "options": [
        "Katla",
        "Hilsa",
        "Pangash",
        "Rui"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Hilsa",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-84",
      "question": "Competitive GK: What is the national animal of Bangladesh?",
      "options": [
        "Royal Bengal Tiger",
        "Elephant",
        "Deer",
        "Lion"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Royal Bengal Tiger",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-85",
      "question": "Competitive GK: What is the national bird of Bangladesh?",
      "options": [
        "Sparrow",
        "Kingfisher",
        "Crow",
        "Magpie robin"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Magpie robin",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-86",
      "question": "Competitive GK: What is the currency of Bangladesh?",
      "options": [
        "Dollar",
        "Riyal",
        "Taka",
        "Rupee"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Taka",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-87",
      "question": "Competitive GK: Which city is known as the port city of Bangladesh?",
      "options": [
        "Dhaka",
        "Sylhet",
        "Chittagong",
        "Rangpur"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Chittagong",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-88",
      "question": "Competitive GK: What is the largest mangrove forest in the world?",
      "options": [
        "Taiga",
        "Congo",
        "Sundarbans",
        "Amazon"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Sundarbans",
      "difficulty": "hard",
      "topic": "Geography"
    },
    {
      "id": "gk-hard-89",
      "question": "Competitive GK: Which river is known as Padma in Bangladesh?",
      "options": [
        "Ganges",
        "Brahmaputra",
        "Meghna",
        "Jamuna"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Ganges",
      "difficulty": "hard",
      "topic": "Geography"
    },
    {
      "id": "gk-hard-90",
      "question": "Competitive GK: Which is the longest sea beach in Bangladesh?",
      "options": [
        "Cox's Bazar",
        "Patenga",
        "Saint Martin",
        "Kuakata"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Cox's Bazar",
      "difficulty": "hard",
      "topic": "Bangladesh"
    },
    {
      "id": "gk-hard-91",
      "question": "Competitive GK: How many continents are there?",
      "options": [
        "7",
        "5",
        "8",
        "6"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: 7",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-92",
      "question": "Competitive GK: Which is the largest continent?",
      "options": [
        "Europe",
        "Africa",
        "Australia",
        "Asia"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Asia",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-93",
      "question": "Competitive GK: Which is the smallest continent?",
      "options": [
        "Antarctica",
        "South America",
        "Europe",
        "Australia"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Australia",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-94",
      "question": "Competitive GK: Which is the largest ocean?",
      "options": [
        "Arctic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Atlantic Ocean"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Pacific Ocean",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-95",
      "question": "Competitive GK: Which planet is known as the Red Planet?",
      "options": [
        "Saturn",
        "Venus",
        "Mars",
        "Jupiter"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mars",
      "difficulty": "hard",
      "topic": "Space"
    },
    {
      "id": "gk-hard-96",
      "question": "Competitive GK: Which is the largest planet?",
      "options": [
        "Mars",
        "Earth",
        "Jupiter",
        "Venus"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Jupiter",
      "difficulty": "hard",
      "topic": "Space"
    },
    {
      "id": "gk-hard-97",
      "question": "Competitive GK: Which planet is closest to the Sun?",
      "options": [
        "Mercury",
        "Earth",
        "Venus",
        "Mars"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Mercury",
      "difficulty": "hard",
      "topic": "Space"
    },
    {
      "id": "gk-hard-98",
      "question": "Competitive GK: Who invented the telephone?",
      "options": [
        "Thomas Edison",
        "Einstein",
        "Newton",
        "Alexander Graham Bell"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Alexander Graham Bell",
      "difficulty": "hard",
      "topic": "Invention"
    },
    {
      "id": "gk-hard-99",
      "question": "Competitive GK: Who discovered penicillin?",
      "options": [
        "Alexander Fleming",
        "Marie Curie",
        "Louis Pasteur",
        "Newton"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Alexander Fleming",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-100",
      "question": "Competitive GK: Who proposed the theory of relativity?",
      "options": [
        "Albert Einstein",
        "Tesla",
        "Isaac Newton",
        "Galileo"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Albert Einstein",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-101",
      "question": "Competitive GK: Who is known as the father of computer?",
      "options": [
        "Alan Turing",
        "Charles Babbage",
        "Steve Jobs",
        "Bill Gates"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Charles Babbage",
      "difficulty": "hard",
      "topic": "ICT"
    },
    {
      "id": "gk-hard-102",
      "question": "Competitive GK: What does UN stand for?",
      "options": [
        "Universal Network",
        "Union Nation",
        "United Navy",
        "United Nations"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: United Nations",
      "difficulty": "hard",
      "topic": "Organization"
    },
    {
      "id": "gk-hard-103",
      "question": "Competitive GK: What does WHO stand for?",
      "options": [
        "World Help Organization",
        "World Human Office",
        "World Health Organization",
        "Wide Health Order"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: World Health Organization",
      "difficulty": "hard",
      "topic": "Organization"
    },
    {
      "id": "gk-hard-104",
      "question": "Competitive GK: What does UNESCO work mainly for?",
      "options": [
        "Only banking",
        "Education, science and culture",
        "Only sports",
        "Only military"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Education, science and culture",
      "difficulty": "hard",
      "topic": "Organization"
    },
    {
      "id": "gk-hard-105",
      "question": "Competitive GK: Which country hosted FIFA World Cup 2022?",
      "options": [
        "Qatar",
        "Russia",
        "Brazil",
        "France"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Qatar",
      "difficulty": "hard",
      "topic": "Sports"
    },
    {
      "id": "gk-hard-106",
      "question": "Competitive GK: How many players are in a football team on field?",
      "options": [
        "12",
        "11",
        "10",
        "9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 11",
      "difficulty": "hard",
      "topic": "Sports"
    },
    {
      "id": "gk-hard-107",
      "question": "Competitive GK: How many players are in a cricket team?",
      "options": [
        "12",
        "11",
        "10",
        "9"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: 11",
      "difficulty": "hard",
      "topic": "Sports"
    },
    {
      "id": "gk-hard-108",
      "question": "Competitive GK: Olympic Games are held every how many years?",
      "options": [
        "3 years",
        "2 years",
        "5 years",
        "4 years"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: 4 years",
      "difficulty": "hard",
      "topic": "Sports"
    },
    {
      "id": "gk-hard-109",
      "question": "Competitive GK: Which gas do humans mainly inhale for respiration?",
      "options": [
        "Carbon dioxide",
        "Nitrogen only",
        "Hydrogen",
        "Oxygen"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Oxygen",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-110",
      "question": "Competitive GK: Which gas do plants absorb for photosynthesis?",
      "options": [
        "Hydrogen",
        "Carbon dioxide",
        "Oxygen",
        "Helium"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Carbon dioxide",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-111",
      "question": "Competitive GK: What is the hardest natural substance?",
      "options": [
        "Iron",
        "Gold",
        "Diamond",
        "Silver"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Diamond",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-112",
      "question": "Competitive GK: Which organ purifies blood in human body?",
      "options": [
        "Stomach",
        "Heart",
        "Kidney",
        "Lung"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Kidney",
      "difficulty": "hard",
      "topic": "Science"
    },
    {
      "id": "gk-hard-113",
      "question": "Competitive GK: Which country is called the Land of the Rising Sun?",
      "options": [
        "Thailand",
        "China",
        "Korea",
        "Japan"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Japan",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-114",
      "question": "Competitive GK: Which is the capital of India?",
      "options": [
        "Chennai",
        "Mumbai",
        "New Delhi",
        "Kolkata"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: New Delhi",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-115",
      "question": "Competitive GK: Which is the capital of the USA?",
      "options": [
        "Los Angeles",
        "Chicago",
        "Washington, D.C.",
        "New York"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Washington, D.C.",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-116",
      "question": "Competitive GK: Which is the capital of the UK?",
      "options": [
        "Manchester",
        "London",
        "Bristol",
        "Liverpool"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: London",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-117",
      "question": "Competitive GK: Which is the capital of France?",
      "options": [
        "Rome",
        "Paris",
        "Madrid",
        "Berlin"
      ],
      "correctAnswer": 1,
      "explanation": "Correct answer: Paris",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-118",
      "question": "Competitive GK: Which is the capital of Japan?",
      "options": [
        "Osaka",
        "Kyoto",
        "Seoul",
        "Tokyo"
      ],
      "correctAnswer": 3,
      "explanation": "Correct answer: Tokyo",
      "difficulty": "hard",
      "topic": "World"
    },
    {
      "id": "gk-hard-119",
      "question": "Competitive GK: Which mountain is the highest in the world?",
      "options": [
        "K2",
        "Kangchenjunga",
        "Mount Everest",
        "Makalu"
      ],
      "correctAnswer": 2,
      "explanation": "Correct answer: Mount Everest",
      "difficulty": "hard",
      "topic": "Geography"
    },
    {
      "id": "gk-hard-120",
      "question": "Competitive GK: Which desert is the largest hot desert?",
      "options": [
        "Sahara",
        "Kalahari",
        "Thar",
        "Gobi"
      ],
      "correctAnswer": 0,
      "explanation": "Correct answer: Sahara",
      "difficulty": "hard",
      "topic": "Geography"
    }
  ]
} as Record<string, QuizQuestionWithTopic[]>;

export const QUIZ_TOPICS: Record<string, string[]> = {
  "math": [
    "Arithmetic",
    "Geometry",
    "Algebra",
    "Circle",
    "Pythagoras",
    "Simple Interest",
    "Factorization",
    "Algebraic Identity"
  ],
  "physics": [
    "Units",
    "Electricity",
    "Motion",
    "Basic",
    "Newton Laws",
    "Waves",
    "Optics",
    "Energy",
    "Pressure",
    "Heat",
    "Force",
    "Speed",
    "Ohm's Law",
    "Kinematics",
    "Electric Power",
    "Work",
    "Circuit"
  ],
  "chemistry": [
    "Symbols",
    "Compounds",
    "Gases",
    "pH",
    "Atomic Structure",
    "Reaction",
    "Corrosion",
    "Acids",
    "Bases",
    "Organic",
    "Separation",
    "States",
    "Periodic Table",
    "Electrolysis",
    "Bonding",
    "Metals",
    "Non-metals"
  ],
  "biology": [
    "Cell",
    "Plant Cell",
    "Plant",
    "Human Body",
    "Blood",
    "Excretion",
    "Circulation",
    "Respiration",
    "Nervous System",
    "Hormone",
    "Genetics",
    "Reproduction",
    "Plant Reproduction",
    "Nutrition",
    "Disease",
    "Classification",
    "Photosynthesis",
    "Digestion",
    "Sense Organ"
  ],
  "english": [
    "Spelling",
    "Verb",
    "Noun",
    "Vocabulary",
    "Grammar",
    "Article",
    "Preposition",
    "Parts of Speech",
    "Voice",
    "Narration",
    "Tense",
    "Modal",
    "Sentence",
    "Tag Question",
    "Degree",
    "Conjunction",
    "Subject-Verb",
    "Pronoun"
  ],
  "ict": [
    "Hardware",
    "Memory",
    "Web",
    "Number System",
    "Database",
    "Internet",
    "Networking",
    "Software",
    "Security",
    "Cloud",
    "Programming",
    "Files",
    "Data"
  ],
  "bangla": [
    "বর্ণ",
    "সাহিত্য",
    "ব্যাকরণ",
    "পদ",
    "বাক্য",
    "শব্দার্থ",
    "সন্ধি",
    "সমাস",
    "কারক",
    "অলংকার",
    "উপন্যাস",
    "ভাষা",
    "ধ্বনি",
    "প্রত্যয়",
    "উপসর্গ",
    "প্রবাদ",
    "বাগধারা",
    "কবিতা",
    "ছন্দ"
  ],
  "gk": [
    "Bangladesh",
    "Geography",
    "World",
    "Space",
    "Invention",
    "Science",
    "ICT",
    "Organization",
    "Sports"
  ]
};

export function getSubjectQuizQuestions(subjectId: string, difficulty: QuizDifficulty = "easy", limit = 10): QuizQuestionWithTopic[] {
  const questions = QUIZ_BY_SUBJECT[subjectId] || [];
  const filtered = questions.filter((q) => q.difficulty === difficulty);
  return [...filtered].sort(() => Math.random() - 0.5).slice(0, limit);
}

export function getQuizCount(subjectId: string, difficulty?: QuizDifficulty): number {
  const questions = QUIZ_BY_SUBJECT[subjectId] || [];
  return difficulty ? questions.filter((q) => q.difficulty === difficulty).length : questions.length;
}
