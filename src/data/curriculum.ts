export interface Section {
  title: string;
  content: string;
  code?: string;
  tip?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export const curriculum: Chapter[] = [
  {
    id: "ch1",
    title: "1. C언어 시작하기 (Basics)",
    sections: [
      {
        title: "C 프로그램의 기본 구조",
        content: "C언어는 main 함수에서 시작하여 main 함수에서 끝납니다. 필요한 기능을 사용하기 위해 헤더 파일(#include)을 포함해야 합니다.",
        code: `#include <stdio.h> // 표준 입출력 헤더

int main(void) {
    printf("Hello, World!\\n"); // 출력
    return 0; // 프로그램 종료 (정상)
}`
      },
      {
        title: "주석 (Comments)",
        content: "코드에 설명을 달 때 사용하며 컴파일러는 이를 무시합니다. //는 한 줄, /* ... */는 여러 줄 주석입니다.",
        code: `// 이것은 한 줄 주석입니다.
/*
   이것은 
   여러 줄 주석입니다.
*/`
      },
      {
        title: "입력 버퍼 주의사항 (scanf Pitfalls)",
        content: "scanf로 문자를 입력받을 때, 이전 입력에서 남은 엔터(개행 문자)가 버퍼에 남아있어 입력이 건너뛰어지는 문제가 자주 발생합니다.",
        tip: "문자 입력 전 getchar()를 호출하거나 scanf(\" %c\", ...) 처럼 공백을 넣어 해결합니다.",
        code: `int num;
char c;

scanf("%d", &num); // 숫자 입력 후 엔터
// 버퍼에 엔터(\\n)가 남음

scanf(" %c", &c); // %c 앞의 공백이 남은 엔터를 무시하고 입력을 받음`
      }
    ]
  },
  {
    id: "ch2",
    title: "2. 변수와 자료형 (Variables)",
    sections: [
      {
        title: "기본 자료형과 서식 지정자",
        content: "데이터를 저장하기 위해 변수를 선언해야 합니다. 각 자료형은 고유한 크기와 서식 지정자(Format Specifier)를 가집니다.",
        table: {
          headers: ["자료형 (Type)", "크기 (Size)", "설명", "서식 지정자"],
          rows: [
            ["char", "1 byte", "문자 1개", "%c"],
            ["short", "2 bytes", "작은 정수", "%hd"],
            ["int", "4 bytes", "정수 (기본)", "%d"],
            ["long", "4 bytes", "큰 정수", "%ld"],
            ["long long", "8 bytes", "더 큰 정수", "%lld"],
            ["float", "4 bytes", "실수 (소수점)", "%f"],
            ["double", "8 bytes", "정밀 실수", "%lf"],
            ["char[] / char*", "가변", "문자열", "%s"],
            ["void*", "4/8 bytes", "주소(포인터)", "%p"]
          ]
        },
        code: `char c = 'A';
int age = 25;
double pi = 3.141592;
char name[] = "Alice";

printf("문자: %c, 정수: %d\\n", c, age);
printf("실수: %.2lf, 이름: %s\\n", pi, name);`
      },
      {
        title: "아스키 코드 (ASCII Code)",
        content: "컴퓨터는 문자를 숫자로 저장합니다. 모든 문자는 고유한 숫자 값(ASCII)을 가집니다. 이를 이용해 문자를 숫자로 연산할 수 있습니다.",
        tip: "한글은 아스키 코드표에 없습니다. 한글은 2바이트(EUC-KR) 혹은 3바이트(UTF-8) 이상을 사용하므로, 'char' 변수 하나에 담을 수 없고 'char 배열(문자열)'을 사용해야 합니다.",
        table: {
            headers: ["문자 (Char)", "아스키 값 (Dec)", "설명"],
            rows: [
                ["'0' ~ '9'", "48 ~ 57", "숫자 문자"],
                ["'A' ~ 'Z'", "65 ~ 90", "대문자"],
                ["'a' ~ 'z'", "97 ~ 122", "소문자"],
                ["'\\0'", "0", "NULL 문자 (문자열 끝)"],
                ["한글", "-", "char에 저장 불가 (배열 필요)"]
            ]
        },
        code: `char c1 = 'A';
printf("%d", c1); // 65 출력

// 대소문자 변환 원리
char c2 = 'a';
printf("%c", c2 - 32); // 'A' (97 - 32 = 65)`
      },
      {
        title: "형변환 (Type Casting)",
        content: "서로 다른 자료형 간의 연산 시 주의해야 합니다. 정수/정수 결과는 정수(몫)만 남습니다.",
        code: `int year = 5, sale = 10;
float a = year / sale;        // 0.00 (정수 나눗셈 후 대입)
float b = (float)year / sale; // 0.50 (형변환으로 실수 나눗셈)`
      },
      {
        title: "오버플로우 (Overflow)",
        content: "변수가 저장할 수 있는 범위를 넘어서면 값이 순환되어 의도치 않은 결과가 발생합니다. 이를 오버플로우라고 합니다.\n\n예를 들어, char는 -128 ~ 127까지 저장 가능합니다. 127에 1을 더하면 128이 되는 것이 아니라 -128이 됩니다.",
        tip: "오버플로우는 보안 취약점의 원인이 되기도 하므로 자료형 선택 시 값의 범위를 신중하게 고려해야 합니다.",
        code: `char c = 127;
c = c + 1;
printf("%d", c); // 출력: -128 (최솟값으로 돌아감)`
      },
      {
        title: "실수의 오차 (Floating Point Error)",
        content: "컴퓨터는 실수를 100% 정확하게 표현하지 못하고 근사값으로 저장합니다. 따라서 실수를 '==' 연산자로 직접 비교하면 안 됩니다.",
        tip: "오차 범위(Epsilon)를 정해두고, 두 값의 차이가 그보다 작은지 확인하는 방식을 사용해야 합니다.",
        code: `float a = 0.1f;
double b = 0.1;

// 겉보기엔 같아 보이지만 다름!
if (a == b) { 
    printf("같음"); 
} else {
    printf("다름"); // 이게 출력됨
}`
      },
      {
        title: "정수 나눗셈의 함정 (Integer Division)",
        content: "정수끼리 나누면 결과도 정수(소수점 버림)가 됩니다. '1 / 2'는 0.5가 아니라 0입니다.",
        tip: "소수점 결과를 원한다면 피연산자 중 하나를 실수로 형변환(casting)해야 합니다.",
        code: `int a = 5, b = 2;
double result1 = a / b;         // 2.0 (5/2 = 2 -> 2.0)
double result2 = (double)a / b; // 2.5 (5.0/2 = 2.5)`
      }
    ]
  },
  {
    id: "ch3",
    title: "3. 연산자와 제어문 (Control Flow)",
    sections: [
      {
        title: "참과 거짓 (True & False)",
        content: "C언어(C99 이전)에는 불리언(Boolean) 타입이 없습니다. 대신 숫자로 참/거짓을 구분합니다.",
        tip: "0은 거짓(False), 0이 아닌 모든 값은 참(True)으로 간주됩니다.",
        code: `if (0) {
    // 실행되지 않음
}

if (100) {
    // 실행됨 (0이 아니므로 참)
}

if (-1) {
    // 실행됨 (0이 아니므로 참!)
}`
      },
      {
        title: "대입(=)과 비교(==)의 혼동",
        content: "프로그래밍 입문자가 가장 많이 하는 실수 중 하나입니다. if문 안에서 비교 연산자(==) 대신 대입 연산자(=)를 쓰면 의도치 않은 결과가 나옵니다.",
        tip: "비교하려는 상수를 왼쪽에 쓰는 습관(Yoda condition, 예: 5 == x)을 들이면 대입 실수를 컴파일러가 잡아줍니다.",
        code: `int x = 0;

// 실수: x에 5를 대입하고, 그 결과값 5(참)를 검사함
if (x = 5) { 
    printf("항상 실행됩니다!"); 
}

// 올바른 비교
if (x == 5) { ... }`
      },
      {
        title: "논리 연산자",
        content: "&& (AND), || (OR), ! (NOT)을 사용하여 조건을 결합합니다.",
        code: `int a = 5, b = 10;
if (a == 5 && b > 5) {
    // a가 5이고 b가 5보다 클 때 실행
}`
      },
      {
        title: "Switch문과 Fall-through",
        content: "break를 생략하면 다음 case까지 실행되는 현상을 'Fall-through'라고 합니다. 이를 이용해 여러 케이스를 묶을 수 있습니다.",
        code: `switch(ch) {
    case '1':
    case '2': // 1 또는 2일 때 실행
        printf("Small Number");
        break;
    default:
        printf("Other");
}`
      },
      {
        title: "단락 평가 (Short-circuit Evaluation)",
        content: "논리 연산자(&&, ||)는 앞의 조건만으로 결과가 확정되면 뒤의 연산을 수행하지 않습니다. 이를 이용해 안전한 코드를 작성할 수 있습니다.",
        code: `int *ptr = NULL;

// ptr이 NULL이면 뒤의 *ptr은 실행되지 않음 (안전)
if (ptr != NULL && *ptr == 10) {
    printf("Safe!");
}

// 순서가 바뀌면? NULL 포인터 역참조로 충돌(Crash)!
if (*ptr == 10 && ptr != NULL) { ... }`
      },
      {
        title: "증감 연산자의 미정의 동작 (Undefined Behavior)",
        content: "한 식에서 같은 변수를 여러 번 증감시키면 컴파일러마다 결과가 다를 수 있습니다. 이는 표준에서 정의하지 않은 동작(Undefined Behavior)입니다.",
        tip: "이런 코드는 절대 작성하면 안 됩니다.",
        code: `int i = 0;
// i가 언제 증가하는지 명확하지 않음
int result = i++ + i++; // 절대 금지!`
      },
      {
        title: "연산자 우선순위 (*p++)",
        content: "포인터 연산 시 *와 ++의 우선순위를 혼동하기 쉽습니다. 후위 ++가 *보다 우선순위가 높습니다.",
        code: `int arr[] = {10, 20};
int *p = arr;

int v1 = *p++;   // 1. p의 값을 가져옴(10) -> 2. p를 증가시킴 (v1=10)
int v2 = (*p)++; // 1. p가 가리키는 값(20)을 가져옴 -> 2. 값 자체를 증가 (20->21)`
      }
    ]
  },
  {
    id: "ch4",
    title: "4. 포인터 (Pointers)",
    sections: [
      {
        title: "포인터의 개념",
        content: "포인터는 변수의 '메모리 주소'를 저장하는 변수입니다. * 연산자를 통해 해당 주소의 값에 접근(역참조)할 수 있습니다.",
        code: `int num = 10;
int *p = &num; // num의 주소를 저장

*p = 20; // p가 가리키는 곳(num)의 값을 20으로 변경
// 결과: num은 20이 됨`
      },
      {
        title: "포인터 연산",
        content: "포인터에 1을 더하면 '가리키는 자료형의 크기'만큼 주소가 증가합니다.",
        code: `int arr[] = {10, 20, 30};
int *p = arr;

// *p는 10
// *p + 1 은 10 + 1 = 11 (값 연산)
// *(p + 1) 은 arr[1] = 20 (주소 이동)`
      },
      {
        title: "문자열 상수와 수정 불가 (Read-only String)",
        content: "문자열 리터럴(\"Hello\")은 읽기 전용 메모리(RODATA)에 저장됩니다. 이를 포인터로 가리킨 뒤 수정하려고 하면 프로그램이 강제 종료됩니다.",
        tip: "수정이 필요하다면 반드시 '배열'을 사용해야 합니다.",
        code: `char *s = "Hello"; // 읽기 전용
// s[0] = 'h'; // 런타임 에러 (Access Violation)

char arr[] = "Hello"; // 스택에 복사된 배열
arr[0] = 'h'; // 가능 (hello가 됨)`
      },
      {
        title: "void 포인터 (Generic Pointer)",
        content: "void*는 '대상 자료형이 정해지지 않은 포인터'입니다. 모든 포인터 주소를 담을 수 있지만, 직접 역참조(*p)하거나 연산(p++)할 수 없습니다.",
        code: `int a = 10;
void *ptr = &a; // 가능

// *ptr = 20; // 에러! (크기를 모름)
*(int*)ptr = 20; // 형변환 후 사용 가능`
      }
    ]
  },
  {
    id: "ch5",
    title: "5. 메모리 구조 (Memory)",
    sections: [
      {
        title: "쓰레기 값 (Garbage Value)",
        content: "함수 내부의 지역 변수(Local Variable)는 선언 시 자동으로 초기화되지 않습니다. 초기화하지 않고 사용하면 메모리에 남아있던 의미 없는 값(Garbage Value)이 나옵니다.",
        tip: "변수 선언과 동시에 'int a = 0;' 처럼 초기화하는 습관이 중요합니다.",
        code: `int main() {
    int n; // 초기화 안 함
    printf("%d", n); // -858993460 같은 이상한 값 출력
}`
      },
      {
        title: "배열 인덱스 초과 (Buffer Overflow)",
        content: "C언어는 배열의 인덱스 범위를 검사하지 않습니다. 선언된 범위를 벗어나 접근해도 컴파일 에러가 나지 않으며, 엉뚱한 메모리를 건드려 치명적인 버그를 만듭니다.",
        code: `int arr[3] = {1, 2, 3};

// 인덱스는 0, 1, 2만 유효함
arr[3] = 100; // 위험! 다른 변수의 값을 덮어쓸 수 있음
arr[-1] = 50; // 위험! 예측 불가능한 동작`
      },
      {
        title: "변수의 저장 영역",
        content: "변수는 선언 위치와 키워드에 따라 저장되는 메모리 영역과 수명이 다릅니다.",
        tip: "시험 필수: 각 변수의 수명을 정확히 알아야 합니다."
      },
      {
        title: "영역별 특징",
        content: "- 스택(Stack): 지역 변수, 매개 변수 (함수 종료 시 소멸)\n- 데이터(Data): 전역 변수, static 변수 (프로그램 종료 시 소멸)\n- 힙(Heap): 동적 할당(malloc) 된 메모리",
        code: `int global; // 데이터 영역

void func() {
    int local; // 스택 영역
    static int count; // 데이터 영역 (값 유지됨)
}`
      }
    ]
  },
  {
    id: "ch6",
    title: "6. 구조체와 고급 문법 (Advanced)",
    sections: [
      {
        title: "구조체 (Structure)",
        content: "여러 자료형을 하나로 묶는 사용자 정의 자료형입니다. 포인터로 접근 시 -> 연산자를 사용합니다.",
        code: `struct Point {
    int x, y;
};

struct Point p1 = {10, 20};
struct Point *ptr = &p1;

ptr->x = 30; // p1.x가 30으로 변경됨`
      },
      {
        title: "비트 연산",
        content: "비트 단위로 데이터를 조작합니다. 임베디드나 시스템 프로그래밍에 필수입니다.",
        code: `int a = 10; // 0000 1010
int b = a >> 1; // 0000 0101 (5) - 2로 나눈 효과
int c = a << 1; // 0001 0100 (20) - 2를 곱한 효과`
      },
      {
        title: "구조체 패딩 (Memory Padding)",
        content: "구조체의 크기는 멤버들의 크기 합과 다를 수 있습니다. CPU가 데이터에 빠르게 접근하기 위해 메모리를 정렬(Alignment)하면서 빈 공간(Padding)을 채워 넣기 때문입니다.",
        tip: "네트워크 통신 등에서는 #pragma pack(1)을 사용해 패딩을 없애기도 합니다.",
        code: `struct Data {
    char c; // 1 byte
    // 3 bytes padding (int 정렬을 맞추기 위해)
    int i;  // 4 bytes
};

// sizeof(struct Data)는 5가 아니라 8입니다.`
      }
    ]
  },
  {
    id: "ch7",
    title: "7. 컴파일과 전처리 (Build Process)",
    sections: [
      {
        title: "컴파일 과정 (Build Process)",
        content: "C언어 소스 코드는 바로 실행될 수 없습니다. 전처리, 컴파일, 어셈블, 링크 과정을 거쳐 실행 파일(.exe)이 됩니다.",
        table: {
            headers: ["단계", "설명", "결과물"],
            rows: [
                ["전처리 (Preprocessing)", "#include, #define 등을 처리", "확장된 소스 코드 (.i)"],
                ["컴파일 (Compilation)", "C언어를 어셈블리어로 번역", "어셈블리 코드 (.s)"],
                ["어셈블 (Assembly)", "기계어로 변환", "목적 파일 (.obj / .o)"],
                ["링크 (Linking)", "여러 목적 파일과 라이브러리 결합", "실행 파일 (.exe)"]
            ]
        }
      },
      {
        title: "전처리 지시자 (#define)",
        content: "#define은 컴파일 전에 텍스트를 단순 치환합니다. 상수 정의나 매크로 함수 생성에 쓰입니다.",
        code: `#define PI 3.14
#define MAX_SIZE 100

double area = PI * r * r; // 3.14 * r * r 로 치환됨`
      },
      {
        title: "매크로 함수의 함정",
        content: "매크로는 단순 치환이므로 연산자 우선순위 문제가 발생하기 쉽습니다. 인자를 괄호로 감싸야 안전합니다.",
        tip: "가능하면 매크로 대신 const 변수나 inline 함수를 사용하는 것이 좋습니다.",
        code: `// 잘못된 예
#define SQUARE(x) x * x
// SQUARE(1+2) -> 1+2 * 1+2 = 1+2+2 = 5 (오답!)

// 올바른 예
#define SQUARE(x) ((x) * (x))
// SQUARE(1+2) -> ((1+2) * (1+2)) = 3 * 3 = 9 (정답)`
      }
    ]
  }
];
