import { MatchData, Analyzer, OutputTarget } from './types';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { HtmlReport } from './reports';

export class Summary {
  constructor(
    public analyzer: Analyzer,
    public outputTarget: OutputTarget
  ) {}

  static default = (team: string): Summary => {
    return new Summary(
      new WinsAnalysis(team),
      new HtmlReport(team),
    );
  }

  buildReport = (matches: MatchData[]): void => {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }

}
