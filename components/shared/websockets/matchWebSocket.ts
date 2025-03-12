import { useMatchesStore } from "../../../store/useMatchesStore";

export const matchWebSocket = (): WebSocket => {
  const ws = new WebSocket("wss://app.ftoyd.com/fronttemp-service/ws");

  ws.onopen = () => {
    console.log("WebSocket подключен");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "update_matches" && data.data) {
        useMatchesStore.getState().setMatchesByWS(data.data);
      }
    } catch (error) {
      console.error("Ошибка обработки WebSocket сообщения", error);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket ошибка", error);
  };

  ws.onclose = () => {
    console.log("WebSocket соединение закрыто");
  };

  return ws;
};
