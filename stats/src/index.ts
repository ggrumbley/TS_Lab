import { MatchReader } from './MatchReader';
import { ConsoleReport } from './reports';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { Summary } from './Summary';

const matchReader = MatchReader.default('football.csv');
matchReader.load();

const summary = new Summary(
  new WinsAnalysis('Crystal Palace'),
  new ConsoleReport(),
);
summary.buildReport(matchReader.matches);

const summaryPage = Summary.default('Crystal Palace');
summaryPage.buildReport(matchReader.matches);
