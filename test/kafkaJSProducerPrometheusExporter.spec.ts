import { beforeEach, describe, expect, test } from '@jest/globals'
import { Registry } from 'prom-client'

import { KafkaJSProducerPrometheusExporter } from '../src/kafkaJSProducerPrometheusExporter'
import { Kafka, type Producer } from 'kafkajs'

describe('tests kafkaJSProducerPrometheusExporter', () => {
  const clientId = 'myTestClientId'
  let register: Registry
  let producer: Producer
  const kafka = new Kafka({
    clientId,
    brokers: ['localhost:9094']
  })

  beforeEach(() => {
    register = new Registry()
    producer = kafka.producer()
  })

  test('test if all metrics are registered in registry', () => {
    const exporter = new KafkaJSProducerPrometheusExporter(producer, register)
    exporter.enableMetrics()
    expect(register.getSingleMetric('kafka_producer_connection_count')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_connection_creation_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_connection_close_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_size_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_queue_size')).toBeDefined()
    expect(register.getMetricsAsArray().length).toBe(6)
  })

  test('test if all metrics are registered in registry with defaultLabels', () => {
    const options = { defaultLabels: { foo: 'bar', alice: 2 } }
    const exporter = new KafkaJSProducerPrometheusExporter(producer, register, options)
    exporter.enableMetrics()
    expect(register.getSingleMetric('kafka_producer_connection_count')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_connection_creation_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_connection_close_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_size_total')).toBeDefined()
    expect(register.getSingleMetric('kafka_producer_request_queue_size')).toBeDefined()
    expect(register.getMetricsAsArray().length).toBe(6)
  })
})
