## 실행 방법
배포 주소: https://2heeesss.github.io/

## 구현 내용
- Summary 위젯 컴포넌트 -https://github.com/2heeesss/Dashboard/pull/6
- Serial 위젯 컴포넌트 - https://github.com/2heeesss/Dashboard/pull/8
- Pie 위젯 컴포넌트 - https://github.com/2heeesss/Dashboard/pull/10
- Table 위젯 컴포넌트 - https://github.com/2heeesss/Dashboard/pull/12
- 위젯 컨테이너인 대시보드 컴포넌트 - https://github.com/2heeesss/Dashboard/pull/4, https://github.com/2heeesss/Dashboard/pull/14


## 고민한 내용

1. 컴포넌트를 어떻게 구분할것인가
    
    재사용가능한 컴포넌트를 만들기위해 아토믹 디자인을 도입하여 컴포넌트를 구분했습니다.
    
    기존 아토믹 디자인의 5단계 에서 3단계로 간소화 했습니다.`atom` , `module` , `template` 으로 구분했습니다. Molecules, Organisms 의 구분이 모호하기 때문에 이 둘을 module 단계로 합쳤습니다. 여러 페이지가 있는 프로젝트가 아니기 때문에 page를 없애고 template 단계만 남겼습니다.
    
    templaet 단계에서는 사용자에게 보여줄 레이아웃에 집중한 단계로 판단했기 때문에, 데이터 주입은 module 단계에서 대부분 진행했습니다.
    
    atom: 더이상 쪼개질 수 없는 컴포넌트 입니다. Text, Button 컴포넌트가 이에 해당합니다.
    
    module: atom을 결합한 카드형태의 컴포넌트 입니다. 다양한 위젯 컴포넌트가 이에 해당합니다.
    
    template: module을 결합하여 사용자에게 보여줄 화면을 실제로 표현하게 됩니다. 
    
2. CSS는 어떻게 사용할것인가
    
    css in js 중 하나인 styled component를 사용했습니다.
    
    css in css 방식으로 작성 할 경우 css 파일을 분리할 수 있다는 장점이 있지만, 클래스이름을 짓는데 오래걸린다는것이 큰 단점이라고 생각했습니다. styled component를 사용했을 때는 클래스이름을 최소화 할 수 있습니다. 
    
    atom 에 정의한 컴포넌트의 스타일을 재정의 할 때 props로 style을 넘기지 않아도 되므로 코드의 복잡성을 줄이는것에 장점이 있다고 생각했습니다.
    
3. 비즈니스 로직은 어떻게 분리할것인가
    
    비즈니스로직을 최대한 분리하기 위해 클래스를 사용했습니다.
    
    `Report` 클래스의 메소드만 활용하여 데이터를 가공하였습니다. 가공된 데이터는 module 단계에서 전달받아 위젯에 실제 값들을 넣어주게 됩니다.
