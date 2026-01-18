import type { Question } from './questions';

export const examQuestions: Question[] = [
  // [Basic] 변형: 정수 나눗셈 함정 (숫자 변경)
  {
    id: 101,
    category: "Data Types",
    difficulty: "Basic",
    question: "다음 코드의 실행 결과는 무엇인가? (소수점 둘째자리까지)",
    code: `int a = 7, b = 2;
float result = a / b;
printf("%.2f", result);`,
    answer: ["3.00", "3"],
    options: ["3.50", "3.00", "3.5", "4.00"],
    correctOptionIndex: 1,
    explanation: "`7 / 2`는 정수 연산이므로 `3`이 됩니다. 이를 `float`에 대입하면 `3.00`이 됩니다. (3.50이 아님에 주의)",
    hint: "정수 나누기 정수"
  },
  // [Basic] 변형: 논리 연산 (AND -> OR, 조건 변경)
  {
    id: 102,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드의 출력값은?",
    code: `int res = (3 > 5) || (10 != 10);
printf("%d", res);`,
    answer: "0",
    options: ["0", "1", "True", "False"],
    correctOptionIndex: 0,
    explanation: "`3 > 5`는 거짓(0), `10 != 10`도 거짓(0)입니다. `0 || 0`의 결과는 `0`입니다.",
    hint: "False OR False"
  },
  // [Basic] 변형: Loop (i 시작값/증감식 변경)
  {
    id: 103,
    category: "Loops",
    difficulty: "Basic",
    question: "다음 `for`문은 총 몇 번 실행되는가?",
    code: `for(int i = 1; i <= 5; i += 2) {
    printf("%d", i);
}`,
    answer: "3",
    options: ["2", "3", "4", "5"],
    correctOptionIndex: 1,
    explanation: "`i`는 1, 3, 5일 때 실행되므로 총 3번입니다.",
    hint: "1, 3, 5..."
  },
  // [Basic] 변형: 후위 증감 연산자 함정
  {
    id: 104,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드 실행 후 `b`의 값은?",
    code: `int a = 5;
int b = a++;`,
    answer: "5",
    options: ["5", "6", "4", "Error"],
    correctOptionIndex: 0,
    explanation: "후위 연산자 `a++`는 대입(`b=a`)을 먼저 수행한 후 `a`를 증가시킵니다. 따라서 `b`에는 5가 들어갑니다.",
    hint: "대입 먼저, 증가 나중"
  },
  // [Basic] 변형: 나머지 연산 (음수 or 다른 수)
  {
    id: 105,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드의 출력값은?",
    code: `printf("%d", 11 % 4);`,
    answer: "3",
    options: ["2", "3", "1", "0"],
    correctOptionIndex: 1,
    explanation: "11을 4로 나누면 몫은 2, 나머지는 3입니다.",
    hint: "나머지"
  },
  // [Intermediate] 변형: 포인터 (이중 포인터 or 다른 변수)
  {
    id: 106,
    category: "Pointers",
    difficulty: "Intermediate",
    question: "다음 코드 실행 후 `a`의 값은?",
    code: `int a = 10;
int *p = &a;
*p = *p * 2;`,
    answer: "20",
    options: ["10", "20", "30", "Error"],
    correctOptionIndex: 1,
    explanation: "`*p`는 `a`의 값(10)입니다. `10 * 2`를 계산하여 다시 `*p`(`a`)에 넣었으므로 20이 됩니다.",
    hint: "10 곱하기 2"
  },
  // [Intermediate] 변형: 배열 포인터 연산
  {
    id: 107,
    category: "Arrays & Pointers",
    difficulty: "Intermediate",
    question: "다음 코드에서 출력되는 값은?",
    code: `int arr[] = {10, 20, 30, 40};
int *p = arr + 2;
printf("%d", *p - 5);`,
    answer: "25",
    options: ["15", "25", "35", "5"],
    correctOptionIndex: 1,
    explanation: "`arr + 2`는 `arr[2]`(30)의 주소입니다. `*p`는 30이고, 여기서 5를 빼면 25가 됩니다.",
    hint: "30 빼기 5"
  },
  // [Intermediate] 변형: Switch (break 있음/없음 섞기)
  {
    id: 108,
    category: "Control Flow",
    difficulty: "Intermediate",
    question: "다음 코드의 출력값은?",
    code: `int n = 0;
switch(n) {
    case 0: printf("Zero");
    case 1: printf("One"); break;
    default: printf("Other");
}`,
    answer: ["ZeroOne", "Zero One"],
    options: ["Zero", "ZeroOne", "ZeroOneOther", "One"],
    correctOptionIndex: 1,
    explanation: "`case 0`에 `break`가 없어서 `Zero` 출력 후 `One`까지 출력되고 멈춥니다.",
    hint: "Zero 출력 후 멈추지 않음"
  },
  // [Intermediate] 변형: Static 변수 (초기화 함정)
  {
    id: 109,
    category: "Storage Class",
    difficulty: "Intermediate",
    question: "다음 함수를 3번 호출했을 때 리턴값은?",
    code: `int count() {
    static int n = 1;
    return ++n;
}`,
    answer: "4",
    options: ["2", "3", "4", "1"],
    correctOptionIndex: 2,
    explanation: "초기값 1에서 시작. 1회차(2) -> 2회차(3) -> 3회차(4). `static`은 초기화를 한 번만 수행합니다.",
    hint: "1에서 시작, 3번 증가"
  },
  // [Advanced] 변형: 포인터 우선순위 (*p++)
  {
    id: 110,
    category: "Pointers",
    difficulty: "Advanced",
    question: "다음 코드 실행 후 `x`의 값은?",
    code: `int arr[] = {10, 20};
int *p = arr;
int x = *p++;`,
    answer: "10",
    options: ["10", "11", "20", "21"],
    correctOptionIndex: 0,
    explanation: "`*p++`에서 `++`는 `p`의 주소를 증가시키지만, 후위 연산이므로 `*p`의 값(10)을 먼저 `x`에 대입한 뒤 포인터가 이동합니다.",
    hint: "값 먼저 가져오고 주소 이동"
  },
  // [Advanced] 변형: 매크로 부작용
  {
    id: 111,
    category: "Preprocessor",
    difficulty: "Advanced",
    question: "다음 매크로의 출력값은?",
    code: `#define MUL(a,b) a*b
printf("%d", MUL(2+3, 4));`,
    answer: "14",
    options: ["20", "14", "10", "Error"],
    correctOptionIndex: 1,
    explanation: "괄호가 없어서 `2+3*4`로 치환됩니다. `2 + 12 = 14`가 됩니다. (20이 아님)",
    hint: "그대로 치환: 2+3*4"
  },
  // [Advanced] 변형: 메모리 누수 (동적 할당 반복)
  {
    id: 112,
    category: "Memory",
    difficulty: "Advanced",
    question: "다음 루프에서 발생하는 치명적인 문제는?",
    code: `while(1) {
    int *p = malloc(1000);
    // free 없음
}`,
    answer: ["Memory Leak", "메모리 누수"],
    options: ["Stack Overflow", "Memory Leak", "Segmentation Fault", "None"],
    correctOptionIndex: 1,
    explanation: "힙 메모리를 계속 할당하기만 하고 해제하지 않아 메모리가 고갈됩니다.",
    hint: "메모리가 샌다"
  },
  // [Advanced] 변형: 구조체 크기 (Padding)
  {
    id: 113,
    category: "Struct",
    difficulty: "Advanced",
    question: "일반적인 32비트 컴파일러에서 다음 구조체의 크기(`sizeof`)는? (Alignment 4byte 기준)",
    code: `struct S {
    char c; // 1 byte
    int i;  // 4 byte
};`,
    answer: "8",
    options: ["5", "8", "6", "4"],
    correctOptionIndex: 1,
    explanation: "`char` 1바이트 뒤에 3바이트 패딩(Padding)이 추가되어 `int`의 4바이트 정렬을 맞춥니다. 총 1+3+4 = 8바이트.",
    hint: "1 + (padding) + 4"
  },
  // [Intermediate] 변형: 문자열 비교
  {
    id: 114,
    category: "Strings",
    difficulty: "Intermediate",
    question: "다음 조건문이 참이 되는 경우는?",
    code: `char s1[] = "A";
char s2[] = "A";
if (s1 == s2) { ... }`,
    answer: ["거짓", "False", "안됨", "주소비교"],
    options: ["참", "거짓", "에러", "알수없음"],
    correctOptionIndex: 1,
    explanation: "배열의 이름은 주소값입니다. `s1`과 `s2`는 서로 다른 메모리 주소를 가지므로 `==` 비교는 거짓입니다. 내용을 비교하려면 `strcmp`를 써야 합니다.",
    hint: "주소값 비교임"
  },
  // [Basic] 변형: 아스키 코드
  {
    id: 115,
    category: "Data Types",
    difficulty: "Basic",
    question: "다음 코드의 출력값은?",
    code: `char c = 'A' + 1;
printf("%c", c);`,
    answer: "B",
    options: ["A", "B", "66", "Error"],
    correctOptionIndex: 1,
    explanation: "'A'의 아스키 코드 다음 문자는 'B'입니다.",
    hint: "A 다음"
  },
  // [Intermediate] 변형: 2차원 배열 인덱스
  {
    id: 116,
    category: "Arrays",
    difficulty: "Intermediate",
    question: "`arr[1][2]`의 값은?",
    code: `int arr[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};`,
    answer: "6",
    options: ["5", "6", "3", "Error"],
    correctOptionIndex: 1,
    explanation: "1행(두 번째 행)의 2열(세 번째 열) 요소이므로 `6`입니다.",
    hint: "0행: 1,2,3 / 1행: 4,5,6"
  },
  // [Advanced] 변형: 비트 연산 (XOR Swap)
  {
    id: 117,
    category: "Bitwise",
    difficulty: "Advanced",
    question: "다음 연산 수행 후 `a`의 값은? (a=5)",
    code: `a = a ^ a;`,
    answer: "0",
    options: ["5", "0", "1", "10"],
    correctOptionIndex: 1,
    explanation: "같은 값을 XOR(`^`)하면 항상 `0`이 됩니다.",
    hint: "XOR 성질"
  },
  // [Intermediate] 변형: 삼항 연산자
  {
    id: 118,
    category: "Operators",
    difficulty: "Intermediate",
    question: "다음 코드 실행 결과는?",
    code: `int a = 10;
int b = (a > 5) ? 100 : -100;
printf("%d", b);`,
    answer: "100",
    options: ["10", "100", "-100", "0"],
    correctOptionIndex: 1,
    explanation: "`a > 5`가 참이므로 `:` 앞의 값 `100`이 선택됩니다.",
    hint: "조건 ? 참 : 거짓"
  },
  // [Intermediate] 변형: Do-While
  {
    id: 119,
    category: "Loops",
    difficulty: "Intermediate",
    question: "다음 루프는 최소 몇 번 실행되는가?",
    code: `int i = 10;
do {
    printf("%d", i);
} while (i < 5);`,
    answer: "1",
    options: ["0", "1", "5", "무한"],
    correctOptionIndex: 1,
    explanation: "`do-while` 문은 조건을 나중에 검사하므로 조건이 거짓이라도 최소 **1번**은 실행됩니다.",
    hint: "무조건 한 번은 실행"
  },
  // [Advanced] 변형: 문자열 포인터 수정 시도
  {
    id: 120,
    category: "Memory",
    difficulty: "Advanced",
    question: "다음 코드 실행 시 발생하는 현상은?",
    code: `char *s = "Hello";
s[0] = 'h';`,
    answer: ["Segmentation Fault", "런타임 에러", "쓰기 금지"],
    options: ["정상 실행", "Segmentation Fault", "Compile Error", "Warning"],
    correctOptionIndex: 1,
    explanation: "문자열 리터럴 `" + '"Hello"' + "`는 읽기 전용(Read-only) 데이터 영역에 저장되므로, 이를 수정하려고 하면 메모리 접근 오류가 발생합니다.",
    hint: "상수 문자열 수정 불가"
  }
];