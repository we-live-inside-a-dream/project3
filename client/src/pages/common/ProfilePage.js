import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";
import LogIn from "../../components/login/LogIn";

export default function ProfilePage({ setUser, user }) {
  return (
    <>
      <Container maxWidth={"xl"}>
        <Box
          className={classes.content}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Profile</h1>
          {!user && <LogIn setUser={setUser} />}
          {user && <EmployeeEditForm user={user} />}
        </Box>
      </Container>
    </>
  );
}
