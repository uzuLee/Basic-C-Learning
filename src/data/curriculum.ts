export interface Section {
  title: string;
  content: string;
  code?: string;
  tip?: string;
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
    printf("Hello, World!\n"); // 출력
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
      }
    ]
  },
  {
    id: "ch2",
    title: "2. 변수와 자료형 (Variables)",
    sections: [
      {
        title: "기본 자료형",
        content: "데이터를 저장하기 위해 변수를 선언해야 합니다. 자료형마다 크기와 저장 가능한 값의 범위가 다릅니다.",
        code: `char c = 'A';       // 문자 (1 byte)
int i = 10;         // 정수 (4 byte)
float f = 3.14f;    // 실수 (4 byte)
double d = 3.14159; // 정밀 실수 (8 byte)`
      },
      {
        title: "형변환 (Type Casting)",
        content: "서로 다른 자료형 간의 연산 시 주의해야 합니다. 정수/정수 결과는 정수(몫)만 남습니다.",
        code: `int year = 5, sale = 10;
float a = year / sale;        // 0.00 (정수 나눗셈 후 대입)
float b = (float)year / sale; // 0.50 (형변환으로 실수 나눗셈)`
      }
    ]
  },
  {
    id: "ch3",
    title: "3. 연산자와 제어문 (Control Flow)",
    sections: [
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
      }
    ]
  },
  {
    id: "ch5",
    title: "5. 메모리 구조 (Memory)",
    sections: [
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
      }
    ]
  }
];
