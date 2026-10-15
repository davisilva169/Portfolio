import { useI18n } from "../../i18n/context";import BackButton from '../../components/BackButton';
import EqBlock from '../../components/EqBlock';
import { NuclearLeaderFigure, TransitionHeightFigure } from '../../components/ThesisFigures';

export default function MuonPaper({ t, setActive }) {const { tr } = useI18n();
  return <article className="research-article">
    <BackButton t={t} onClick={() => setActive('Research')} label={tr("BACK TO RESEARCH")} />
    <header className="article-heading">
      <p className="eyebrow">{tr("Undergraduate thesis \xB7 2026 \xB7 Completed")}</p>
      <h1>{tr("Muon Puzzle & Leading Particle Effect")}</h1>
      <p className="article-deck">{tr("From a uniform-fragmentation reference to the evolution of the most energetic particle in atmospheric showers.")}</p>
      <div className="article-meta"><span>{tr("Davi Santos-Silva")}</span><span>{tr("IFSC \u2014 USP")}</span><span>{tr("Advisor: Prof. Dr. Leonardo Paulo Maia")}</span><span>{tr("FAPESP 2024/21601-7")}</span></div>
    </header>
    <aside className="reading-path"><span className="eyebrow">{tr("Start here")}</span><p>{tr("This study continues the Null Model of Uniform Fragmentation. Read the earlier page for the statistical construction, then return here for the multigeneration analysis and the completed thesis results.")}</p><button className="text-link" onClick={() => setActive('UniformFragmentation')}>{tr("Read the null model ")}<span aria-hidden="true">↗</span></button></aside>
    <div className="article-body">
      <section><p className="eyebrow">{tr("01 \xB7 Research question")}</p><h2>{tr("When is the largest fragment more than a statistical accident?")}</h2>
        <p>{tr("A high-energy cosmic ray colliding with an atmospheric nucleus initiates a cascade of secondary particles. In some interactions, one secondary retains a substantial share of the available energy. Yet every unequal partition has a largest fragment: its existence alone does not establish a physical leading-particle effect.")}</p>
        <p>{tr("The thesis compares this energy concentration with a deliberately simple statistical reference: uniform fragmentation, adjusted to reproduce the multiplicity distribution of the simulated collisions. The question is whether hadronic interactions produce a larger and more persistent asymmetry than random partitioning would predict.")}</p>
        <p>{tr("The completed study finds a broad energy distribution and events with nearly complete retention by one secondary, recurring across the simulated primaries, energies and generations. It also examines changes in the leader's identity and the height at which the leading chain crosses a threshold associated with hybrid shower simulation.")}</p>
      </section>
      <section><p className="eyebrow">{tr("02 \xB7 Reference model")}</p><h2>{tr("Compare energy sharing at the same multiplicity.")}</h2>
        <p>{tr("For an interaction with n secondaries, the null model draws n \u2212 1 independent uniform breakpoints in the unit interval. The largest spacing represents the most energetic fragment. The analytical survival function is")}</p>
        <EqBlock t={t} label={tr("Largest uniform spacing")} math={String.raw`\Pr(M_n>x)=\sum_{k=1}^{\min(n,\lfloor 1/x\rfloor)}(-1)^{k-1}\binom{n}{k}(1-kx)^{n-1}`} />
        <p>{tr("Only geometrically admissible terms contribute. Monte Carlo sampling independently checks this analytical reference. Because the number of secondaries fluctuates between collisions, the fixed-multiplicity distributions are then mixed using the empirical multiplicity weights.")}</p>
        <EqBlock t={t} label={tr("Multiplicity-weighted reference")} math={String.raw`f_{\mathrm{null}}(x)=\sum_n f(x\mid n)\,P_{\mathrm{CONEX}}(n),\qquad x=\frac{E_{\max}}{E_0}`} />
        <p>{tr("This comparison controls the number of descendants. It does not turn the null model into a complete hadronic collision model: conservation laws and other physical constraints remain outside its deliberately restricted scope.")}</p>
      </section>
      <section><p className="eyebrow">{tr("03 \xB7 Simulation campaign")}</p><h2>{tr("Follow the leading chain through five generations.")}</h2>
        <div className="study-facts"><div><strong>43</strong><span>{tr("Primary\u2013energy combinations")}</span></div><div><strong>{tr('150,000')}</strong><span>{tr("Showers per combination")}</span></div><div><strong>5</strong><span>{tr("Successive generations recorded")}</span></div></div>
        <p>{tr("The campaign uses CONEX 7.60 with the SIBYLL hadronic model. It covers proton, helium and carbon primaries from 10\xB9\xB2 to 10\xB2\u2070 eV, and silicon and iron from 10\xB9\xB3 to 10\xB2\u2070 eV. For each recorded interaction, the analysis extracts the largest secondary energy, incident energy, multiplicity, atmospheric depth and leader identity from ROOT outputs using parallel Python routines.")}</p>
        <p>{tr("Two selections matter for interpreting the results. Records must satisfy x \u2265 1/n, as required for nonnegative fractions summing to one; this removes between zero and three percent of rows, depending on the generation. For the comparison across primary species, interactions with a nuclear leader are excluded. That second selection concerns the leader, not the projectile initiating the interaction.")}</p>
        <p>{tr("The earlier null-model page documents a previous phase of the project. The simulation settings and sample sizes reported here belong to the completed 2026 thesis.")}</p>
      </section>
      <section><p className="eyebrow">{tr("04 \xB7 Energy concentration")}</p><h2>{tr("The asymmetry survives the statistical comparison.")}</h2>
        <p>{tr("For the first interaction of 150,000 proton showers at 10\xB2\u2070 eV, the simulated leading-energy fraction has mean 0.371 and median 0.313, with a peak near x = 1. Multiplicity varies strongly: its mean is about 665, its median is 440, and its tail exceeds 4,500 secondaries.")}</p>
        <p>{tr("Once weighted by that multiplicity distribution, the uniform reference places very little probability above a leading fraction of 0.2. The simulated distribution remains much broader. The discrepancy recurs in the conditions studied and persists into the fifth generation, where the proton panel at 10\xB2\u2070 eV contains 74,020 selected records from the original 150,000-shower campaign.")}</p>
        <p>{tr("After excluding nuclear leaders, the fifth-generation distributions at 10\xB2\u2070 eV form similar envelopes across the five primary species. This is a result for the selected sample and the tested configurations, not a claim of universality across all interaction models.")}</p>
      </section>
      <section><p className="eyebrow">{tr("05 \xB7 Nuclear fragments")}</p><h2>{tr("The leading chain gradually loses its nuclear component.")}</h2>
        <p>{tr("The fraction of recorded interactions with a nuclear leader falls with generation. For iron at 10\xB2\u2070 eV it decreases from 96.2% in the first generation to 27.8% in the fifth; carbon falls from 72.4% to 5.3%. The chart below reproduces the thesis table and lets you isolate each primary.")}</p>
        <NuclearLeaderFigure />
        <p>{tr("Removing nuclear leaders does not remove every interaction initiated by a nuclear fragment. Residual spikes near 1/2, 1/3 and 1/4 arise when light fragments produce a leading nucleon. In the iron sample, the half-energy structure is associated with deuterons; more than 99% of the structures near one third and one quarter originate from \xB3He and \u2074He, respectively. These features describe the selected records and nuclear modeling; they do not impose a general upper bound of one half on non-nuclear leaders.")}</p>
      </section>
      <section><p className="eyebrow">{tr("06 \xB7 Leader identity")}</p><h2>{tr("The effect persists while the carrier changes.")}</h2>
        <p>{tr("For proton showers at 10\xB2\u2070 eV and intermediate fractions, 0.1 < x \u2264 0.9, protons are the most frequent identified family in the first two generations, with shares of 42.6% and 28.4%. Pions become the most frequent identified family in the third generation, reaching 32.8% in the fifth. This is a plurality, not an absolute majority.")}</p>
        <p>{tr("In the high-energy peak, x > 0.9, the proton share falls from 88.9% in the first generation to 25.2% in the fifth. In that final generation, neutrons account for 26.5% and pions for 21.8%. Almost complete energy retention therefore ceases to be concentrated in the proton family.")}</p>
        <p>{tr("This matters because charged pions can feed the muonic channel, whereas neutral pions transfer energy to the electromagnetic channel. However, grouping all pions together and following only the leader does not determine the total energy deposited in either channel. Quantifying that connection requires separating charges and tracking the other branches.")}</p>
      </section>
      <section><p className="eyebrow">{tr("07 \xB7 Hybrid simulation")}</p><h2>{tr("A threshold belongs to a chain, not to a horizontal boundary.")}</h2>
        <p>{tr("CONEX follows high-energy particles stochastically and treats lower-energy cascades through cascade equations. For the hadronic component considered here, the threshold is 0.005 of the primary energy. Different branches cross it at different points: there is no single transition altitude for the whole shower.")}</p>
        <p>{tr("Reference CORSIKA simulations with SIBYLL reconstruct this crossing for proton primaries at 10\xB9\u2074 and 10\xB9\u2079 eV, at a zenith angle of 60\xB0 in a subtropical atmosphere. One estimator averages all hadronic tracks in the threshold window. The other follows the most energetic daughter at each vertex until the leading chain crosses the threshold.")}</p>
        <TransitionHeightFigure />
        <p>{tr("The all-tracks estimate is higher because it includes secondaries born near the threshold in other branches at larger altitudes. The thesis reports gaps of approximately 3.9 km and 3.5 km between the estimators. Shower-to-shower dispersions are several kilometres, and only 14 valid pairs are available at the higher energy; these are not precision determinations.")}</p>
        <p>{tr("The mean leading-chain crossing heights lie above the maximum of the mean muon-number profile, which is near 5.8 km for the 10\xB9\u2079 eV proton sample. That profile counts muons present along the cascade. Its maximum is not the maximum of the muon-production-depth distribution.")}</p>
      </section>
      <section><p className="eyebrow">{tr("08 \xB7 Conclusions and limits")}</p><h2>{tr("Characterizing the leader does not yet solve the Muon Puzzle.")}</h2>
        <p>{tr("The thesis establishes energy sharing that is more asymmetric than uniform fragmentation in the simulated conditions, documents its persistence along the leading chain, and distinguishes nuclear-fragment effects from changes in the non-nuclear leader population.")}</p>
        <p>{tr("The height comparison motivates a hypothesis: limitations of the mean cascade treatment could contribute to the simulated muon deficit. It does not demonstrate that contribution or establish causality. A controlled test must vary the hybrid threshold and compare muonic observables, extend the primary and energy coverage, and correlate each reconstructed chain with the final muon count.")}</p>
        <p>{tr("Following the charge of leading pions is another natural step. In particular, the frequency of leading neutral pions connects energy transfer into the electromagnetic channel with the broader problem of forward hadronic production.")}</p>
      </section>
      <section className="article-sources"><p className="eyebrow">{tr("Source and presentations")}</p><h2>{tr("From the thesis to scientific discussion.")}</h2>
        <p>{tr("This page is based on Davi dos Santos Silva's undergraduate thesis, \u201CEfeito de part\xEDcula l\xEDder em chuveiros atmosf\xE9ricos\u201D (IFSC\u2013USP, 2026), supervised by Prof. Dr. Leonardo Paulo Maia. Figures were redrawn from Table 1 and section 3.7; the original sample sizes and interpretation limits are retained.")}</p>
        <p>{tr("The research was presented as posters at SIICUSP and SIIFISC.")}</p>
        <div className="article-links"><button className="text-link" onClick={() => setActive('Presentations')}>{tr("View presentations \u2197")}</button><a className="text-link" href="https://github.com/davisilva169/Leading-Particles-and-Muon-Puzzle" target="_blank" rel="noopener noreferrer">{tr("GitHub repository \u2197")}</a><button className="text-link" onClick={() => setActive('UniformFragmentation')}>{tr("Previous study: uniform fragmentation \u2197")}</button></div>
      </section>
    </div>
  </article>;
}
