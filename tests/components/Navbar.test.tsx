import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/app/components/Navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("Navbar", () => {
  it("renders the brand/logo link", () => {
    render(<Navbar />);
    const brandLink = screen.getByText("My Portfolio");
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    const navLinks = [
      "Home",
      "About",
      "Education",
      "Skills",
      "Projects",
      "Contact",
    ];

    navLinks.forEach((linkText) => {
      const link = screen.getByRole("link", { name: linkText });
      expect(link).toBeInTheDocument();
    });
  });

  it("opens mobile menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Find hamburger button (should be visible on mobile)
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();

    // Click the button
    await user.click(menuButton);

    // Menu should be open - check that aria-expanded is true
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Verify mobile menu is visible by checking for multiple Home links
    // (one in desktop nav, one in mobile menu)
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.length).toBeGreaterThan(1);
  });
});
