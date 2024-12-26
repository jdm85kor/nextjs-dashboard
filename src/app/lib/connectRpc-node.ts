import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-node";
import { EventService } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb.js";

const transport = createGrpcWebTransport({
  baseUrl:
    "https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app",
  httpVersion: "2",
});

export const eventClient = createClient(EventService, transport);
