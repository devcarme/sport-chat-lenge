import React from "react";

const QuestionnaireSelect = ({ details }) => (
  <option value={details.idQuestionnaire}>{details.nomQuestionnaire}</option>
);

export default QuestionnaireSelect;
