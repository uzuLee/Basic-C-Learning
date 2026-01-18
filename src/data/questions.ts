export type Difficulty = 'Basic' | 'Intermediate' | 'Advanced';

export interface Question {
  id: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  code?: string;
  answer: string | string[];
  options?: string[];
  correctOptionIndex?: number;
  explanation: string;
  hint?: string;
}

export const questions: Question[] = [
  // ==========================================
  // [Basic] 기초 문법 (1~20)
  // ==========================================
  {
    id: 1,
    category: "Data Types",
    difficulty: "Basic",
    question: "다음 코드의 실행 결과(`a`의 값)는 무엇인가? (소수점 둘째자리까지)",
    code: `int year = 5, sale = 10;
float a = year / sale;
printf(\"%.2f\", a);`,
    answer: ["0.00", "0"],
    options: ["0.00", "0.50", "0.20", "NaN"],
    correctOptionIndex: 0,
    explanation: "`int`끼리의 나눗셈(`5/10`) 결과는 정수 `0`이 됩니다. 이 값이 `float` 변수 `a`에 대입되면서 `0.00`이 출력됩니다.",
    hint: "정수 / 정수 = 정수 (소수점 버림)"
  },
  {
    id: 2,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드의 출력값(`result`)은?",
    code: `int result = (5 == 5) && (10 > 5);
printf(\"%d\", result);`,
    answer: "1",
    options: ["0", "1", "-1", "Error"],
    correctOptionIndex: 1,
    explanation: "`5==5`는 참(1), `10>5`도 참(1)입니다. `1 && 1` 연산의 결과는 `1`입니다.",
    hint: "True AND True"
  },
  {
    id: 3,
    category: "Loops",
    difficulty: "Basic",
    question: "다음 `for`문은 총 몇 번 실행되는가?",
    code: `for(int i = 0; i < 5; i++) {
    printf(\"Loop %d\\n\", i);
}`,
    answer: "5",
    options: ["4", "5", "6", "무한"],
    correctOptionIndex: 1,
    explanation: "`i`가 0, 1, 2, 3, 4일 때 실행되므로 총 5번입니다.",
    hint: "0부터 4까지"
  },
  {
    id: 4,
    category: "Variables",
    difficulty: "Basic",
    question: "다음 중 컴파일 에러가 발생하는(유효하지 않은) 변수명은 무엇인가? (변수명만 입력)",
    code: `int main() {
    int my_id = 10;
    int _count = 20;
    int 3id = 30;
    int ID3 = 40;
    return 0;
}`,
    answer: ["3id", "int 3id"],
    options: ["my_id", "_count", "3id", "ID3"],
    correctOptionIndex: 2,
    explanation: "C언어 식별자(변수명)는 **숫자로 시작할 수 없습니다**. `3id`는 잘못된 이름입니다.",
    hint: "숫자로 시작하는 변수 찾기"
  },
  {
    id: 5,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드에서 `idx`가 `0, 1, 2`를 반복하게 하려면 빈칸에 어떤 연산자가 필요한가?",
    code: `int idx = 0;
while(1) {
    idx = (idx + 1) [ ? ] 3;
    printf(\"%d \", idx);
}`,
    answer: "%",
    options: ["/", "%", "&", "+"],
    correctOptionIndex: 1,
    explanation: "나머지 연산자 `%`를 사용하면 `0, 1, 2` 범위 내에서 값을 순환시킬 수 있습니다.",
    hint: "나머지 구하기"
  },
  {
    id: 6,
    category: "I/O",
    difficulty: "Basic",
    question: "다음 코드가 정상 작동하기 위해 맨 윗줄에 필요한 헤더 파일은?",
    code: `// [ ? ]

int main() {
    printf(\"Hello World\");
    return 0;
}`,
    answer: ["<stdio.h>", "stdio.h", "#include <stdio.h>"],
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
    correctOptionIndex: 0,
    explanation: "`printf` 함수는 표준 입출력 라이브러리인 `stdio.h`에 정의되어 있습니다.",
    hint: "Standard Input Output"
  },
  {
    id: 7,
    category: "Data Types",
    difficulty: "Basic",
    question: "다음 변수 선언 중 문법적으로 **틀린** 것은?",
    code: `1. char c = 'A';
2. int i = 10.5;
3. float f = 3.14f;
4. char s = \"Hello\";`,
    answer: ["4", "4번", "char s"],
    options: ["1", "2", "3", "4"],
    correctOptionIndex: 3,
    explanation: "`\"Hello\"`는 문자열이므로 `char` 변수(문자 1개)에 저장할 수 없습니다. `char s[]` 또는 `char* s`를 써야 합니다. (2번은 경고가 뜨지만 컴파일은 되어 잘림)",
    hint: "문자열(String)을 문자(Char) 변수에 넣으려 함"
  },
  {
    id: 8,
    category: "Loops",
    difficulty: "Basic",
    question: "다음 `while`문의 빈칸에 무엇을 넣어야 **무한 루프**가 되는가? (가장 간단한 정수)",
    code: `while( [ ? ] ) {
    printf(\"Running forever...\\n\");
}`,
    answer: "1",
    options: ["0", "1", "null", "false"],
    correctOptionIndex: 1,
    explanation: "C언어에서 `0`이 아닌 값은 참(True)으로 간주됩니다. 보통 `1`을 사용하여 무한 루프를 만듭니다.",
    hint: "참(True)을 뜻하는 숫자"
  },
  {
    id: 9,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드 실행 후 `a`의 값은?",
    code: `int a = 10;
a++;
a += 2;`,
    answer: "13",
    options: ["11", "12", "13", "14"],
    correctOptionIndex: 2,
    explanation: "`a++`(11이 됨) -> `a+=2`(13이 됨).",
    hint: "10 + 1 + 2"
  },
  {
    id: 10,
    category: "Arrays",
    difficulty: "Basic",
    question: "다음 배열 선언에서 초기화되지 않은 `arr[3]`의 값은 무엇인가?",
    code: `int arr[5] = {10, 20, 30};
// arr[3]의 값은?`,
    answer: "0",
    options: ["10", "20", "30", "0"],
    correctOptionIndex: 3,
    explanation: "배열을 초기화 리스트로 선언할 때, 명시되지 않은 나머지 요소들은 자동으로 `0`으로 초기화됩니다.",
    hint: "자동 초기화 값"
  },
  {
    id: 11,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 조건식의 결과가 참(`1`)이 되려면 `x`는 어떤 값이어야 하는가?",
    code: `if (x > 10 && x < 20)`,
    answer: ["15", "11", "12", "19"],
    options: ["10", "5", "15", "20"],
    correctOptionIndex: 2,
    explanation: "10초과 20미만이어야 하므로 보기 중 `15`가 정답입니다. (주관식: 11~19 사이 정수)",
    hint: "10과 20 사이"
  },
  {
    id: 12,
    category: "Functions",
    difficulty: "Basic",
    question: "다음 함수 정의에서 반환값이 없음을 나타내는 키워드는?",
    code: `[ ? ] printHello() {
    printf(\"Hello\");
    return;
}`,
    answer: "void",
    options: ["int", "char", "void", "null"],
    correctOptionIndex: 2,
    explanation: "`void`는 '비어있음'을 의미하며, 함수가 값을 반환하지 않을 때 사용합니다.",
    hint: "빈, 공허한"
  },
  {
    id: 13,
    category: "Escape Sequence",
    difficulty: "Basic",
    question: "다음 `printf` 문에서 줄바꿈을 위해 필요한 이스케이프 문자는?",
    code: `printf(\"Hello[ ? ]World\");
// 출력:
// Hello
// World`,
    answer: ["\\n", "n"],
    options: ["\\t", "\\n", "\\r", "\\0"],
    correctOptionIndex: 1,
    explanation: "`\\n` (New Line)은 줄을 바꾸는 제어 문자입니다.",
    hint: "개행 문자"
  },
  {
    id: 14,
    category: "Comments",
    difficulty: "Basic",
    question: "다음 중 주석 처리가 올바르지 **않은** 것은?",
    code: `1. // 한 줄 주석
2. /* 여러 줄 
      주석 */
3. /* 중첩 /* 주석 */ 시도 */
4. int a = 1; // 끝`,
    answer: ["3", "3번"],
    options: ["1", "2", "3", "4"],
    correctOptionIndex: 2,
    explanation: "C언어 표준에서 `/* ... */` 블록 주석은 중첩될 수 없습니다. 첫 번째 `*/`를 만나는 순간 주석이 끝난 것으로 처리되어 뒤의 내용이 에러가 됩니다.",
    hint: "블록 주석은 겹쳐 쓸 수 없음"
  },
  {
    id: 15,
    category: "Variables",
    difficulty: "Basic",
    question: "값을 변경할 수 없는 상수 변수 `PI`를 선언하는 올바른 코드는?",
    code: `[ ? ] float PI = 3.14f;
PI = 3.15f; // 에러 발생`,
    answer: "const",
    options: ["static", "const", "final", "let"],
    correctOptionIndex: 1,
    explanation: "`const` 키워드를 붙이면 변수가 상수화되어 값을 변경할 수 없습니다.",
    hint: "Constant"
  },
  {
    id: 16,
    category: "Data Types",
    difficulty: "Basic",
    question: "다음 `printf` 서식 지정자 중 `double`형 변수 출력에 적합한 것은?",
    code: `double d = 3.141592;
printf(\"[ ? ]\", d);`,
    answer: ["%lf", "lf"],
    options: ["%d", "%f", "%lf", "%s"],
    correctOptionIndex: 2,
    explanation: "`double`은 Long Float이므로 `%lf`를 사용합니다. (`%f`도 가능하지만 명시적으로 `%lf`를 권장하는 경우가 많음)",
    hint: "Long Float"
  },
  {
    id: 17,
    category: "Operators",
    difficulty: "Basic",
    question: "다음 코드에서 `a`와 `b`가 **다를 때** 참이 되는 연산자는?",
    code: `if (a [ ? ] b) {
    printf(\"Different!\");
}`,
    answer: ["!=", "!=!="],
    options: ["==", "!=", "=", "<>"],
    correctOptionIndex: 1,
    explanation: "`!=` 연산자는 두 값이 다를 때 True(1)를 반환합니다.",
    hint: "같지 않다"
  },
  {
    id: 18,
    category: "Structure",
    difficulty: "Basic",
    question: "다음 구조체 멤버 `age`에 접근하기 위해 빈칸에 들어갈 연산자는?",
    code: `struct Person p;
 p.age = 20;

struct Person *ptr = &p;
ptr[ ? ]age = 21;`,
    answer: ["->", "화살표"],
    options: [".", "->", "::", "&"],
    correctOptionIndex: 1,
    explanation: "구조체 **포인터**를 통해 멤버에 접근할 때는 화살표 연산자 `->`를 사용합니다.",
    hint: "화살표"
  },
  {
    id: 19,
    category: "Arrays",
    difficulty: "Basic",
    question: "다음 2차원 배열 선언에서 총 원소의 개수는?",
    code: `int grid[3][4];`,
    answer: "12",
    options: ["7", "12", "3", "4"],
    correctOptionIndex: 1,
    explanation: "3행 * 4열 = 12개의 `int` 공간이 할당됩니다.",
    hint: "3 곱하기 4"
  },
  {
    id: 20,
    category: "Functions",
    difficulty: "Basic",
    question: "C언어 프로그램이 시작될 때 가장 먼저 호출되는 진입점 함수는?",
    code: `int [ ? ](void) {
    return 0;
}`,
    answer: ["main", "main()"],
    options: ["start", "begin", "main", "init"],
    correctOptionIndex: 2,
    explanation: "운영체제는 프로그램을 실행할 때 `main` 함수를 찾아 호출합니다.",
    hint: "메인"
  },

  // ==========================================
  // [Intermediate] 포인터, 배열, 메모리 (21~40)
  // ==========================================
  {
    id: 21,
    category: "Pointers",
    difficulty: "Intermediate",
    question: "다음 코드 실행 후 출력되는 `val`의 값은?",
    code: `void change(int *p) {
    *p = 50;
}
int main() {
    int val = 10;
    change(&val);
    printf(\"%d\", val);
}`,
    answer: "50",
    options: ["10", "50", "0", "Error"],
    correctOptionIndex: 1,
    explanation: "함수에 `val`의 주소를 전달(`&val`)했고, 함수 내부에서 포인터 역참조(`*p`)로 값을 50으로 변경했습니다.",
    hint: "Call by Reference"
  },
  {
    id: 22,
    category: "Void Pointer",
    difficulty: "Intermediate",
    question: "다음 코드에서 컴파일 에러가 발생하는 줄은?",
    code: `int a = 10;
void *p = &a;
1. p = &a;
2. int *p2 = (int*)p;
3. *p = 20; // 에러`,
    answer: ["3", "3번", "*p"],
    options: ["1", "2", "3", "None"],
    correctOptionIndex: 2,
    explanation: "`void` 포인터는 가리키는 대상의 크기 정보를 모르기 때문에, 직접 역참조(`*p`)하여 값을 읽거나 쓸 수 없습니다. 형변환 후 사용해야 합니다.",
    hint: "void 포인터는 바로 값에 접근 불가"
  },
  {
    id: 23,
    category: "Switch Case",
    difficulty: "Intermediate",
    question: "다음 코드의 출력값은? (Fall-through 주의)",
    code: `int n = 1;
switch(n) {
    case 1: printf(\"A\");
    case 2: printf(\"B\"); break;
    default: printf(\"C\");
}`,
    answer: "AB",
    options: ["A", "B", "AB", "ABC"],
    correctOptionIndex: 2,
    explanation: "`case 1`에 `break`가 없으므로 `printf(\"A\")` 실행 후 바로 아래 `case 2`로 떨어져서(Fall-through) `printf(\"B\")`까지 실행되고 `break`를 만납니다.",
    hint: "A 찍고 멈추지 않음"
  },
  {
    id: 24,
    category: "Static",
    difficulty: "Intermediate",
    question: "다음 함수를 2번 호출했을 때 마지막에 출력되는 `count` 값은?",
    code: `void counter() {
    static int count = 0;
    count++;
    printf(\"%d\", count);
}`,
    answer: "2",
    options: ["0", "1", "2", "Error"],
    correctOptionIndex: 2,
    explanation: "`static` 변수는 함수가 종료되어도 메모리에서 사라지지 않고 값을 유지합니다. 첫 호출 때 1, 두 번째 호출 때 2가 됩니다.",
    hint: "값이 초기화되지 않고 유지됨"
  },
  {
    id: 25,
    category: "Struct & Pointer",
    difficulty: "Intermediate",
    question: "구조체 포인터 `p`를 사용하여 멤버 `x`의 값을 읽는 올바른 표현은?",
    code: `struct Point { int x, y; };
struct Point pt = {10, 20};
struct Point *p = &pt;

// 값 10을 가져오려면?`,
    answer: ["p->x", "(*p).x"],
    options: ["p.x", "p->x", "*p.x", "p::x"],
    correctOptionIndex: 1,
    explanation: "포인터로 구조체 멤버 접근 시 `->` 연산자를 사용하거나 `(*p).x` 처럼 괄호로 감싸고 `.`을 써야 합니다. `*p.x`는 연산자 우선순위 때문에 틀립니다.",
    hint: "화살표 또는 역참조 후 접근"
  },
  {
    id: 26,
    category: "Strings",
    difficulty: "Intermediate",
    question: "다음 문자열 함수 중 `dest` 배열의 크기를 초과하여 덮어쓸 위험(Buffer Overflow)이 있는 함수는?",
    code: `char src[] = "VeryLongString...";
char dest[5];

1. strncpy(dest, src, sizeof(dest));
2. strcpy(dest, src);
3. snprintf(dest, 5, \"%s\", src);`,
    answer: ["2", "strcpy", "2번"],
    options: ["1", "2", "3", "None"],
    correctOptionIndex: 1,
    explanation: "`strcpy`는 복사할 길이를 검사하지 않고 Null 문자가 나올 때까지 복사하므로, 목적지 버퍼 크기를 넘칠 수 있습니다. `strncpy` 등을 권장합니다.",
    hint: "길이 검사 안 하는 함수"
  },
  {
    id: 27,
    category: "Strings",
    difficulty: "Intermediate",
    question: "다음 코드 실행 후 `len`의 값은?",
    code: `char str[] = "Hello\\0World";
int len = strlen(str);`,
    answer: "5",
    options: ["5", "10", "11", "Error"],
    correctOptionIndex: 0,
    explanation: "`strlen` 함수는 첫 번째 `\\0`(Null Character)을 만날 때까지만 길이를 셉니다. `Hello` 뒤에 바로 널 문자가 있으므로 길이는 5입니다.",
    hint: "Null 문자까지만 셈"
  },
  {
    id: 28,
    category: "Function Pointer",
    difficulty: "Intermediate",
    question: "다음 중 함수 포인터 `fp`를 올바르게 선언한 코드는?",
    code: `int add(int a, int b) { return a+b; }
// fp 선언:`,
    answer: ["int (*fp)(int, int);", "int (*fp)(int,int)"],
    options: ["int *fp(int, int);", "int (*fp)(int, int);", "int fp(int, int);", "void *fp;"],
    correctOptionIndex: 1,
    explanation: "함수 포인터는 `반환형 (*변수명)(매개변수타입)` 형식을 따릅니다. 괄호 `(*fp)`가 없으면 포인터를 반환하는 함수 선언이 됩니다.",
    hint: "(*이름) 괄호 필수"
  },
  {
    id: 29,
    category: "Macro",
    difficulty: "Intermediate",
    question: "매크로 함수 사용 시 부작용(Side Effect)을 막기 위해 괄호가 필요한 부분은?",
    code: `#define SQUARE(x) (x * x) // 위험!
// SQUARE(1+2) -> 1+2 * 1+2 = 1 + 2 + 2 = 5 (오답)

// 올바른 정의: #define SQUARE(x) [ ? ]`,
    answer: ["((x)*(x))", "(x)*(x)"],
    options: ["(x * x)", "((x)*(x))", "{x * x}", "x * x"],
    correctOptionIndex: 1,
    explanation: "매크로 인자는 단순 치환되므로, 연산자 우선순위 문제를 막기 위해 인자마다 괄호를 쳐야 합니다. `((x)*(x))`",
    hint: "모든 x에 괄호를 쳐야 함"
  },
  {
    id: 30,
    category: "Pointers",
    difficulty: "Intermediate",
    question: "다음 코드에서 `ptr`이 가리키는 주소는 몇 바이트 증가하는가? (int는 4바이트 가정)",
    code: `int *ptr = 0x1000;
ptr++;`,
    answer: "4",
    options: ["1", "4", "8", "0"],
    correctOptionIndex: 1,
    explanation: "포인터 연산 시 `1`을 더하면 `sizeof(type)` 만큼 주소가 증가합니다. `int` 포인터이므로 4바이트 증가합니다.",
    hint: "자료형 크기만큼 점프"
  },
  {
    id: 40,
    category: "Memory",
    difficulty: "Advanced",
    question: "다음 코드에서 발생하는 메모리 관련 오류의 명칭은?",
    code: `int *p = (int*)malloc(sizeof(int));
*p = 10;
free(p);
*p = 20; // 이미 해제된 메모리 접근`,
    answer: ["Use After Free", "UAF", "Dangling Pointer"],
    options: ["Memory Leak", "Use After Free", "Stack Overflow", "Double Free"],
    correctOptionIndex: 1,
    explanation: "해제된(`free`) 메모리 공간에 다시 접근하여 값을 쓰거나 읽는 것을 **Use After Free**라고 하며, 이때 `p`는 댕글링 포인터가 됩니다.",
    hint: "해제 후 사용"
  },
  {
    id: 41,
    category: "Memory",
    difficulty: "Advanced",
    question: "다음 코드에서 발생할 수 있는 치명적인 오류는?",
    code: `void func() {
    char *p = (char*)malloc(10);
    // free(p) 없음
}`,
    answer: ["Memory Leak", "메모리 누수"],
    options: ["Segmentation Fault", "Memory Leak", "Buffer Overflow", "Deadlock"],
    correctOptionIndex: 1,
    explanation: "할당된 힙 메모리를 해제하지 않고 함수가 종료되면, 해당 메모리 주소를 잃어버려 영원히 해제할 수 없는 **메모리 누수(Memory Leak)**가 발생합니다.",
    hint: "메모리가 줄줄 샌다"
  },
  {
    id: 42,
    category: "Pointers",
    difficulty: "Advanced",
    question: "다음 배열 포인터 선언 중 `int arr[3][4]`를 가리킬 수 있는 올바른 것은?",
    code: `int arr[3][4];
// 포인터 선언:`,
    answer: ["int (*p)[4]", "int (*p)[4];"],
    options: ["int *p[4]", "int (*p)[4]", "int **p", "int *p"],
    correctOptionIndex: 1,
    explanation: "열의 개수(`[4]`)를 명시한 배열 포인터 `int (*p)[4]`가 필요합니다. `int *p[4]`는 포인터 배열입니다.",
    hint: "괄호와 열 개수 주의"
  }
];