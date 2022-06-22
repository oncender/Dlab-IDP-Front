CHECKLIST_COLUMN = {
    "columns": [
        'univ',  # Universe
        'fc',  # 펀드 코드
        'fn',  # 펀드명
        'an',  # 자산명
        'domfor',  # 국내 해외
        'at',  # 투자 자산 유형
        'ft',  # 펀드 구분
        'it',  # 투자 유형
        'ismom',  # 모자 구분
        'strat',  # 투자 전략
        'iscmplt',  # 완료 여부
        'univexcl',  # Universe 제외 이유
        '_',  # 작업인
        '_',  # 작업일
        'fsource',  # 데이터 소스 (ECM)
        'fpath',  # 파일 경로
        'fname',  # 파일 명
        'misc',  # 비고
        '_',
        '_'
    ],
    "columns_map": {
        # column eng name: ["column korean name", used in JSON: bool]
        'univ': ["Universe", True],  # Universe
        'fc': ["펀드코드", True],  # 펀드 코드
        'fn': ["펀드명", True],  # 펀드명
        'an': ["자산명", True],  # 자산명
        'domfor': ["국내 해외", True],  # 국내 해외
        'at': ["투자 자산 유형", True],  # 투자 자산 유형
        'ft': ["펀드 구분", True],  # 펀드 구분
        'it': ["투자 유형", True],  # 투자 유형
        'ismom': ["모자 구분", True],  # 모자 구분
        'strat': ["투자 전략", True],  # 투자 전략
        'iscmplt': ["완료 여부", True],  # 완료 여부
        'univexcl': ["Universe 제외 이유", False],  # Universe 제외 이유
        'fsource': ["데이터 소스", True],  # 데이터 소스 (ECM)
        'fpath': ["파일 경로", True],  # 파일 경로
        'fname': ["파일 명", True],  # 파일 명
        'misc': ["비고", False],
    }
}

DEBT_COLUMN = {
    "columns": [
        'fc',  # 펀드코드
        'fn',  # 펀드명
        'sdate',  # 설정일
        'mdate',  # 만기일
        'an',  # 자산명
        'am',  # 자산수
        'domfor',  # 국내해외
        'at',  # 투자 자산 유형
        'ft',  # 펀드 구분
        'it',  # 투자 유형
        'start',  # 투자 전략
        'area',  # 연면적 (평)
        'equity',  # EQUITY 총액
        'loan',  # LOAN 총액
        'aum',  # AUM 총액
        'ltv',  # LTV
        'loannum',  # 대출계약서 수
        'ro',  # 롤오버
        'trnsdate',  # 매매계약체결일
        'loandate',  # 대출계약체결일
        'lpnum',  # 대주수
        'lp',  # 대주
        'lpname',  # 대주명
        'lpcorp',  # 대주명회사
        'lpt',  # 대주명분류
        'seniorstr',  # 대출순위
        'senior',  # 우선순위
        'loanuse',  # 대출용도
        'sellto',  # 매도인
        'loantype',  # 대출 종류
        'loancls',  # 대출 분류
        'addr',  # 토지 주소
        'loanratio',  # 대출 참가 비율
        'loanamt',  # 대출약정금
        'loanrpy',  # 대출금상환방식
        'rate',  # 금리 종류
        'loanintcls',  # 대출 이자율 분류
        'loanint',  # 대출 이자율
        'loanintfloat',  # 변동이자율기준
        'sdaterate',  # 체결일 이자율
        'spread',  # 스프레드
        'loanpremium',  # 대출취급수수료
        'intdur',  # 이자기간
        'laterate',  # 연체이자율
        'lateratecls',  # 연체이자율 분류
        'sdatelaterate',  # 체결일연체이자율
        'earlypremium',  # 조기상황수수료
        'earlypremiumcls',  # 조기상환수수료분류
        'guranteelimit',  # 담보한도율
        'guranteemax',  # 담보채권최고액
        'dscr',  # DSCR
        'dscrval',  # DSCR    rkqt
        'intdeposit',  # 이자유보금  interest deposit
        'default',  # 채무불이행요건
        'opinion',  # 대주의의사결정
        'contact',  # 통지처
        'lender',  # 차주
        'trustee',  # 신탁업자
        'amc',  # 집합투자업자
        'financialinst',  # 대리금융기관
        'mm',  # 자금관리자 Money Manager
        'cashsupp',  # 자금보충인 cash deficiency support
        'debtundwrt',  # 채무인수인 debt underwrite
        'builder',  # 시공사
        'loanplan',  # 대출실행예정일 loan plan date
        'loanexec',  # 대출 실행일 loan execute date
        'loanmatr',  # 대출 만기일 loan maturity date
        'duration',  # 듀레이션 duration
        'loanmatrymd',  # 대출만기일 YMD
        '_',  # macro data vlookup 결과
        '_',
        '_',
        '_',
        '_',
        '_',
        '_'
    ],
    "columns_map": {
        'fc': ["펀드코드", True],
        'fn': ["펀드명", True],
        'sdate': ["설정일", True],
        'mdate': ["만기일", True],
        'an': ['자산명', True],
        'ac': ['자산수', True],
        'domfor': ['국내해외', True],
        'at': ['투자 자산 유형', True],
        'ft': ['펀드 구분', True],
        'it': ['투자 유형', True],
        'strat': ['투자 전략', True],
        'area': ['연면적 (평)', True],
        'equity': ['EQUITY 총액', True],
        'loan': ['LOAN 총액', True],
        'aum': ['AUM 총액', True],
        'ltv': ['LTV', True],
        'loancnt': ['대출계약서 수', False],
        'ro': ['롤오버', False],
        'trnsdate': ['매매계약체결일', False],
        'loandate': ['대출계약체결일', True],
        'lpnum': ['대주수', True],
        'lp': ['대주', True],
        'lpname': ['대주명', False],
        'lpcorp': ['대주명회사', True],
        'lpt': ['대주명분류', True],
        'seniorstr': ['대출순위', True],
        'senior': ['우선순위', False],
        'loanuse': ['대출용도', True],
        'sellto': ['매도인', False],
        'loantype': ['대출 종류', False],
        'loancls': ['대출 분류', True],
        'addr': ['토지 주소', True],
        'loanratio': ['대출 참가 비율', False],
        'loanamt': ['대출약정금', True],
        'loanrpy': ['대출금상환방식', True],
        'rate': ['금리 종류', True],
        'loanintcls': ['대출 이자율 분류', True],
        'loanint': ['대출 이자율', True],
        'loanintfloat': ['변동이자율기준', True],
        'sdaterate': ['체결일 이자율', True],
        'spread': ['스프레드', True],
        'loanpremium': ['대출취급수수료', True],
        'intdur': ['이자기간', True],
        'laterate': ['연체이자율', True],
        'lateratecls': ['연체이자율 분류', True],
        'sdatelaterate': ['체결일연체이자율', False],
        'earlypremium': ['조기상황수수료', True],
        'earlypremiumcls': ['조기상환수수료분류', True],
        'guranteelimit': ['담보한도율', True],
        'guranteemax': ['담보채권최고액', False],
        'dscr': ['DSCR', True],
        'dscrval': ['DSCR값', False],
        'intdeposit': ['이자유보금', True],
        'default': ['채무불이행요건', True],
        'opinion': ['대주의의사결정', True],
        'contact': ['통지처', False],
        'lender': ['차주', True],
        'trustee': ['신탁업자', True],
        'amc': ['집합투자업자', True],
        'financialinst': ['대리금융기관', True],
        'mm': ['자금관리자', True],
        'cashsupp': ['자금보충인', True],  # cash deficiency support
        'debtundwrt': ['채무인수인', True],  # debt underwrite
        'builder': ['시공사', True],
        'loanplan': ['대출실행예정일', False],  # loan plan date
        'loanexec': ['대출 실행일', False],  # loan execute date
        'loanmatr': ['대출 만기일', False],  # loan maturity date
        'duration': ['듀레이션', True],  # duration
        'loanmatrymd': ['대출만기일', False],  # YMD
    }
}

MACRO_COLUMN = {
    "columns": [
        'ind',
        'date',
        'kr1y',
        'kr3y',
        'kr5y',
        'ifd1y',
        'cd91d',
        'cp91d',
        'koribor3m'
    ]
}
