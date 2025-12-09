import { describe, it, expect, vi, beforeEach } from "vitest";
import { getWorkshopTickets, getWorkshopTicketById, updateWorkshopTicketStatus, deleteWorkshopTicket } from "../db";

// Mock the database
vi.mock("../db", async () => {
  const actual = await vi.importActual("../db");
  return {
    ...actual,
    getWorkshopTickets: vi.fn(),
    getWorkshopTicketById: vi.fn(),
    updateWorkshopTicketStatus: vi.fn(),
    deleteWorkshopTicket: vi.fn(),
  };
});

describe("Admin Bookings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getWorkshopTickets", () => {
    it("should return all workshop tickets", async () => {
      const mockTickets = [
        {
          id: "1",
          workshopId: "w1",
          userId: "u1",
          email: "test@example.com",
          name: "John Doe",
          quantity: "2",
          totalPrice: "100",
          status: "confirmed",
          createdAt: new Date(),
        },
      ];

      vi.mocked(getWorkshopTickets).mockResolvedValue(mockTickets as any);

      const result = await getWorkshopTickets();
      expect(result).toEqual(mockTickets);
      expect(getWorkshopTickets).toHaveBeenCalled();
    });

    it("should return empty array when no tickets exist", async () => {
      vi.mocked(getWorkshopTickets).mockResolvedValue([]);

      const result = await getWorkshopTickets();
      expect(result).toEqual([]);
    });
  });

  describe("getWorkshopTicketById", () => {
    it("should return a specific workshop ticket", async () => {
      const mockTicket = {
        id: "1",
        workshopId: "w1",
        userId: "u1",
        email: "test@example.com",
        name: "John Doe",
        quantity: "2",
        totalPrice: "100",
        status: "confirmed",
        createdAt: new Date(),
      };

      vi.mocked(getWorkshopTicketById).mockResolvedValue(mockTicket as any);

      const result = await getWorkshopTicketById("1");
      expect(result).toEqual(mockTicket);
      expect(getWorkshopTicketById).toHaveBeenCalledWith("1");
    });

    it("should return undefined when ticket not found", async () => {
      vi.mocked(getWorkshopTicketById).mockResolvedValue(undefined);

      const result = await getWorkshopTicketById("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("updateWorkshopTicketStatus", () => {
    it("should update ticket status to confirmed", async () => {
      vi.mocked(updateWorkshopTicketStatus).mockResolvedValue(true);

      const result = await updateWorkshopTicketStatus("1", "confirmed");
      expect(result).toBe(true);
      expect(updateWorkshopTicketStatus).toHaveBeenCalledWith("1", "confirmed");
    });

    it("should update ticket status to cancelled", async () => {
      vi.mocked(updateWorkshopTicketStatus).mockResolvedValue(true);

      const result = await updateWorkshopTicketStatus("1", "cancelled");
      expect(result).toBe(true);
      expect(updateWorkshopTicketStatus).toHaveBeenCalledWith("1", "cancelled");
    });

    it("should return false on update failure", async () => {
      vi.mocked(updateWorkshopTicketStatus).mockResolvedValue(false);

      const result = await updateWorkshopTicketStatus("1", "confirmed");
      expect(result).toBe(false);
    });
  });

  describe("deleteWorkshopTicket", () => {
    it("should delete a workshop ticket", async () => {
      vi.mocked(deleteWorkshopTicket).mockResolvedValue(true);

      const result = await deleteWorkshopTicket("1");
      expect(result).toBe(true);
      expect(deleteWorkshopTicket).toHaveBeenCalledWith("1");
    });

    it("should return false on delete failure", async () => {
      vi.mocked(deleteWorkshopTicket).mockResolvedValue(false);

      const result = await deleteWorkshopTicket("nonexistent");
      expect(result).toBe(false);
    });
  });
});
