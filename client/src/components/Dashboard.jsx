import styled from "styled-components";
import BillsList from "./BillsList";
import IncomeList from "./IncomeList";
import CalendarContainer from "./CalendarContainer";

const StyledMainGrid = styled.div`
  display: grid;
  grid-template-areas:
    "calendar income"
    "calendar bills";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  width: 100%;
  padding: 1rem 2rem;

  .calendar-container {
    grid-area: calendar;
  }

  .bills-list-container {
    grid-area: bills;
  }
  .income-list-container {
    grid-area: income;
  }
`;

const Dashboard = () => {
  return (
    <StyledMainGrid>

      <CalendarContainer />

      <BillsList />

      <IncomeList />

    </StyledMainGrid>
  );
};

export default Dashboard;