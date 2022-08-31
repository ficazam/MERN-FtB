import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TicketType, TicketStateType } from "../../types";
import { ticketService } from "./ticketService";

const initialState: TicketStateType = {
  tickets: [],
  ticket: { product: "", description: "" },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//new ticket:
export const createTicket = createAsyncThunk<void, TicketType, {state: RootState}>(
  "tickets/create",
  async (ticket: TicketType, thunkAPI) => {
    try {
      const token:string | any = thunkAPI.getState().auth.user!.token
      return await ticketService.newTicket(ticket, token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        //for whatever reason, it's still sending to localhost:3000
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get tickets
export const getTickets = createAsyncThunk<void, string, {state: RootState}>('tickets/getAll',async (user:string, thunkAPI) => {
  try {
    const token:string | any = thunkAPI.getState().auth.user!.token
    return await ticketService.getTickets(token);
  } catch (error: any) {
    const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        //for whatever reason, it's still sending to localhost:3000
      return thunkAPI.rejectWithValue(message);
  }
})

//update tickets:
export const updateTicket = createAsyncThunk<void, TicketType, {state: RootState}>(
  "tickets/update",
  async (ticket: TicketType, thunkAPI) => {
    try {
    const token:string | any = thunkAPI.getState().auth.user!.token
      return await ticketService.updateTicket(ticket, token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete tickets:
export const deleteTicket = createAsyncThunk<void, string, {state: RootState}>(
  "tickets/delete",
  async (id: string, thunkAPI) => {
    try {
    const token:string | any = thunkAPI.getState().auth.user!.token
      return await ticketService.deleteTicket(id, token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    })
    .addCase(createTicket.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload
    })
    .addCase(getTickets.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets = action.payload;
    })
    .addCase(getTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;