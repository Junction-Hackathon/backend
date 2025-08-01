export interface KafkaConfig {
  brokers: string[];
  clientId: string;
  sasl?: {
    mechanism: string;
    username: string;
    password: string;

  };
  ssl?: boolean;
  consumer?: {
    groupId: string;
  };
  producer?: {
    allowAutoTopicCreation?: boolean;
  };
  retry?: {
    initialRetryTime?: number;
    retries?: number;
    factor?: number;
    maxRetryTime?: number;
  };
  maxInFlightRequests?: number;
  maxWaitTimeInMs?: number;
  heartbeatInterval?: number;
  sessionTimeout?: number;
  maxPollInterval?: number;
  isolationLevel?: 'read_uncommitted' | 'read_committed';
  requestTimeout?: number;
  logLevel?: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  logConnectionClose?: boolean;
  logRequest?: boolean;
  logResponse?: boolean;
}
