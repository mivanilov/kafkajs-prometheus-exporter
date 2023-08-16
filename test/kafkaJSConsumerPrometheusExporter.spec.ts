import { beforeEach, describe, expect, test, jest } from '@jest/globals'
import { Registry } from 'prom-client'

import { monitorKafkaJS } from '../src/monitorKafkaJS'
import { KafkaJSConsumerPrometheusExporter } from '../src/kafkaJSConsumerPrometheusExporter'
import { type Consumer } from 'kafkajs'

jest.mock('../src/kafkaJSConsumerPrometheusExporter')
const mockKafkaJSConsumerPrometheusExporter = jest.mocked(KafkaJSConsumerPrometheusExporter)

describe('tests monitorKafkaJS', () => {
  const clientId = 'myTest'
  let kafkaConsumer: Consumer
  let register: Registry

  beforeEach(() => {
    register = new Registry()
    mockKafkaJSConsumerPrometheusExporter.mockClear()
  })

  test('tests if monitorKafkaJSConsumer called KafkaJSConsumerPrometheusExporter with mandatory parameter', () => {
    monitorKafkaJS(kafkaConsumer, clientId, register)
    expect(mockKafkaJSConsumerPrometheusExporter).toHaveBeenCalledTimes(1)
    expect(mockKafkaJSConsumerPrometheusExporter).toBeCalledWith(kafkaConsumer, clientId, register)
  })

  test('tests if monitorKafkaJSConsumer called methods of KafkaJSConsumerPrometheusExporter instance', () => {
    monitorKafkaJS(kafkaConsumer, clientId, register)
    const mockKafkaJSConsumerPrometheusExporterInstance = mockKafkaJSConsumerPrometheusExporter.mock.instances[0]
    const monitorEnableMetrics = mockKafkaJSConsumerPrometheusExporterInstance.enableMetrics as jest.Mock
    expect(monitorEnableMetrics).toHaveBeenCalledTimes(1)
  })
})
