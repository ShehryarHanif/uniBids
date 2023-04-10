const { render, screen } = require("@testing-library/react");
const userEvent = require("@testing-library/user-event");
const Register = require("../client/src/App/Pages/Register/Register");
const Login = require("../client/src/App/Pages/Login/Login");

describe("Register Page Test", () => {
  it("Register successfully", async () => {
    render(<Register />);

    userEvent.type(screen.getByLabelText(/name/i), "Test User");
    userEvent.type(screen.getByLabelText(/username/i), "testuser");
    userEvent.type(screen.getByLabelText(/email/i), "test.user@gmail.com");
    userEvent.type(screen.getByLabelText(/password/i), "Password");
    userEvent.type(screen.getByLabelText(/password again/i), "Password");
    userEvent.type(screen.getByLabelText(/room/i), Math.floor(Math.random() * 1000).toString());
    userEvent.click(screen.getByText(/submit/i));

    const alert = await screen.findAllByRole("alert");

    expect(alert).toHaveTextContent("Successful Registration");
  });
});

describe("Login Page Test", () => {
    it("Login successfully", async () => {
        render(<Login />);
    
        userEvent.type(screen.getByLabelText(/email/i), "test.user@gmail.com");
        userEvent.type(screen.getByLabelText(/password/i), "password");
       
        userEvent.click(screen.getByText(/submit/i));
    
        const alert = await screen.findAllByRole("alert");
    
        expect(alert).toHaveTextContent("Successful Login");
      });
})
