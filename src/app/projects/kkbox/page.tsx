import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KKBOX · Churn Prevention System",
  description: "이탈 예측을 사용자별 원인 분석, 리텐션 액션, ROI 시뮬레이션으로 연결한 KKBOX 프로젝트입니다.",
};

const modelMetrics = [
  { name: "XGBoost", score: "0.9045", fp: "1,379", tp: "6,754" },
  { name: "Stacking", score: "0.9054", fp: "1,189", tp: "6,621" },
];

export default function KkboxPage() {
  return (
    <main className="case-page kkbox-case">
      <header className="case-nav case-width">
        <Link href="/">← 이재희 포트폴리오</Link>
        <a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-2nd-3TEAM" target="_blank" rel="noreferrer">GitHub ↗</a>
      </header>

      <section className="case-hero case-width">
        <p className="case-kicker">MACHINE LEARNING · BUSINESS ACTION · 2026</p>
        <h1>KKBOX Churn Prevention</h1>
        <p className="case-subtitle">누가 이탈할지 예측하는 모델을 넘어,<br />왜 이탈하는지와 무엇을 해야 하는지까지 연결한 서비스</p>
        <div className="case-info">
          <div><span>기간</span><strong>2026.03.26 – 2026.04.02</strong></div>
          <div><span>팀</span><strong>5인 팀 프로젝트</strong></div>
          <div><span>주요 기여</span><strong>Churn Attribution Model · Frontend</strong></div>
        </div>
      </section>

      <div className="case-cover case-width kkbox-cover">
        <Image src="/images/projects/kkbox-roi.png" alt="KKBOX 마케팅 성과 시뮬레이터" fill priority sizes="(max-width: 900px) 100vw, 1100px" />
      </div>

      <section className="case-section case-width">
        <aside><span>01</span><h2>프로젝트에서<br />맡은 역할</h2></aside>
        <div className="case-content">
          <p className="case-lead">모델의 예측값을 사용자별 이탈 사유로 바꾸고 서비스 화면까지 전달</p>
          <p>XGBoost의 Feature Contribution을 이용한 이탈 원인 분석 파이프라인과 Streamlit 프론트엔드를 담당했습니다. 예측 결과 CSV와 사용자 데이터를 연결해 고위험 고객별 원인·카테고리를 만들고, Action Board와 시뮬레이터에서 사용할 수 있는 형태로 구성했습니다.</p>
          <div className="responsibility-grid">
            <div><strong>Attribution Model</strong><span>사용자별 양의 기여도 상위 3개 피처 추출</span></div>
            <div><strong>Reason Mapping</strong><span>모델 피처를 결제·활동·이용 습관 원인으로 변환</span></div>
            <div><strong>Data Connection</strong><span>예측 결과와 고객 데이터를 화면 데이터로 연결</span></div>
            <div><strong>Frontend</strong><span>Action Board · ROI Simulator 시각화</span></div>
          </div>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>02</span><h2>예측만으로는<br />결정할 수 없던 액션</h2></aside>
          <div className="case-content">
            <p className="case-lead">Churn probability 0.87 — 그래서 운영자는 무엇을 해야 할까?</p>
            <div className="decision-chain">
              <div><span>01</span><strong>Prediction</strong><p>누가 이탈할 가능성이 높은가</p></div>
              <i>→</i><div><span>02</span><strong>Explanation</strong><p>어떤 행동이 위험을 높였는가</p></div>
              <i>→</i><div><span>03</span><strong>Action</strong><p>누구에게 어떤 개입이 필요한가</p></div>
              <i>→</i><div><span>04</span><strong>ROI</strong><p>개입 비용보다 기대 수익이 큰가</p></div>
            </div>
            <p>모델 점수만 보여주는 대시보드가 아니라 예측을 설명하고 대응 우선순위를 정할 수 있는 흐름을 목표로 잡았습니다.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>03</span><h2>전체 경향이 아닌<br />사용자별 원인 분석</h2></aside>
        <div className="case-content">
          <p className="case-lead">Global Feature Importance만으로 설명하기 어려운 개별 고객의 이탈 이유</p>
          <div className="attribution-flow">
            <div><span>INPUT</span><strong>고객별 행동·결제 피처</strong><p>자동 갱신 · 취소 · 결제 공백 · 활동일 · 청취량</p></div>
            <i>→</i><div><span>MODEL</span><strong>XGBoost pred_contribs</strong><p>각 피처가 이탈 방향에 미친 기여도 계산</p></div>
            <i>→</i><div><span>OUTPUT</span><strong>상위 3개 이탈 원인</strong><p>양의 기여도 기준 추출 후 한글 사유·카테고리 변환</p></div>
          </div>
          <div className="reason-groups">
            <span>결제 및 구독</span><span>활동 및 참여</span><span>콘텐츠 이용 습관</span><span>사용자 프로필</span>
          </div>
          <p>동일한 이탈 확률을 가진 고객도 원인이 다르면 필요한 액션이 달라집니다. 원본 피처명을 운영자가 이해할 수 있는 사유와 범주로 재분류했습니다.</p>
        </div>
      </section>

      <section className="case-section dark">
        <div className="case-width case-section-inner">
          <aside><span>04</span><h2>성능 차이보다<br />운영 비용으로 본 오류</h2></aside>
          <div className="case-content">
            <p className="case-lead">유지 고객을 이탈 고객으로 오분류하면 발생하는 불필요한 쿠폰 비용</p>
            <div className="model-compare">
              {modelMetrics.map((model) => <article key={model.name}><h3>{model.name}</h3><div><span>평균 성능</span><strong>{model.score}</strong></div><div><span>False Positive</span><strong>{model.fp}</strong></div><div><span>True Positive</span><strong>{model.tp}</strong></div></article>)}
            </div>
            <p>Stacking은 XGBoost보다 평균 성능이 0.0009 높았지만 구조는 더 복잡해졌습니다. 대신 유지 고객을 이탈로 잘못 판단한 False Positive가 190건 줄어, 모델 차이를 단순 점수가 아닌 마케팅 비용 관점에서도 비교할 수 있었습니다.</p>
            <p className="dark-emphasis">False Positive를 모델 오류가 아니라 <strong>불필요한 리텐션 비용</strong>으로 해석했습니다.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>05</span><h2>고위험 고객을<br />행동 목록으로 전환</h2></aside>
        <div className="case-content">
          <p className="case-lead">예측 확률, 만료 임박 여부, 이탈 원인을 한 화면에서 확인하는 Action Board</p>
          <div className="action-board-flow">
            <div><strong>Risk Filter</strong><p>이탈 확률과 구독 만료일로 대응 대상 선별</p></div>
            <div><strong>Reason Filter</strong><p>결제·활동·콘텐츠 원인별 고객 분류</p></div>
            <div><strong>Priority List</strong><p>고위험 고객과 권장 액션을 운영 목록으로 제공</p></div>
          </div>
          <p>전체 고객 통계와 개별 고객 분석을 분리해, 운영자가 현황을 확인한 뒤 실제 대응 대상까지 내려갈 수 있도록 구성했습니다.</p>
        </div>
      </section>

      <section className="case-section tinted">
        <div className="case-width case-section-inner">
          <aside><span>06</span><h2>리텐션 전략의<br />ROI 시뮬레이션</h2></aside>
          <div className="case-content">
            <p className="case-lead">할인 쿠폰과 무료 연장 중 어떤 전략이 더 나은지 조건을 바꿔 비교</p>
            <div className="simulator-grid">
              <div><span>INPUT</span><strong>할인율 · 가입 기간 · 대상 고객</strong></div>
              <div><span>ESTIMATE</span><strong>예상 방어 성공률 · 잔존 고객</strong></div>
              <div><span>COMPARE</span><strong>캠페인 비용 · 3개월 누적 수익</strong></div>
            </div>
            <p>시뮬레이터는 실제 캠페인 실적이 아니라 가격 민감도와 월별 추가 이탈률 등 코드에 정의한 가정을 기반으로 한 비교 도구입니다. 결과값 자체보다 동일한 조건에서 전략별 비용과 기대 수익을 비교하는 데 초점을 맞췄습니다.</p>
          </div>
        </div>
      </section>

      <section className="case-section case-width">
        <aside><span>07</span><h2>대용량 데이터의<br />현실적인 범위 설정</h2></aside>
        <div className="case-content">
          <p className="case-lead">30GB가 넘는 원본 로그를 짧은 프로젝트 기간 안에 전부 학습하기 어려운 제약</p>
          <div className="data-volume"><div><span>USER LOGS</span><strong>약 30.5GB</strong><p>약 3억 9천만 행</p></div><div><span>TRANSACTIONS</span><strong>약 1.7GB</strong><p>약 2,150만 행</p></div><div><span>TRAINING SET</span><strong>100,000명</strong><p>활동 기록이 존재하는 균형 데이터</p></div></div>
          <p>전체 데이터 처리 경험으로 과장하지 않고, 결측이 없고 활동 기록이 존재하는 사용자 10만 명을 선별해 이탈·유지 비율을 1:1로 구성했습니다. 따라서 성능 수치는 이 균형 표본 안에서 해석해야 합니다.</p>
        </div>
      </section>

      <section className="case-section case-width reflection">
        <aside><span>08</span><h2>회고</h2></aside>
        <div className="case-content">
          <p className="case-lead">좋은 예측보다 사용 가능한 예측을 만드는 과정</p>
          <p>모델 성능을 높이는 것만으로는 운영자가 다음 행동을 결정하기 어려웠습니다. 사용자별 원인과 대응 목록, 비용 비교 화면까지 연결하면서 ML 결과는 설명과 업무 흐름 속에 들어갈 때 비로소 서비스 가치가 생긴다는 점을 배웠습니다. 다시 진행한다면 실제 캠페인 결과를 수집해 시뮬레이터의 가정값을 검증하고, 불균형 원본 분포에서도 모델 성능과 비용을 다시 평가할 것입니다.</p>
          <div className="case-links"><a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN27-2nd-3TEAM" target="_blank" rel="noreferrer">GitHub Repository ↗</a><Link href="/">다른 프로젝트 보기 →</Link></div>
        </div>
      </section>
    </main>
  );
}
