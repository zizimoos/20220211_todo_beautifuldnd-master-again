// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      subjectBoxColor: string;
      boardsColor: string;
      boardColor: string;
      cardColor: string;
    };
  }
}
