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
      cardCoverColor: string;
      cardCoverColor_02: string;
      draggingCardColor: string;
      cardColor: string;
      wasteColor: string;
    };
  }
}
