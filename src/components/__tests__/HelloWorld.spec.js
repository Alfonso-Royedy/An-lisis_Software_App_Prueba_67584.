import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RFCInput from '../RFCInput.vue'

it('renders the component', () => {
  const wrapper = mount(RFCInput, {
    props: {
      RFC: 'AAAA010101AAA'
    }
  })
  expect(wrapper.html()).toMatchSnapshot()
})

it('not pass RFC XXX901010', async () => {
  const wrapper = mount(RFCInput)
  const input = wrapper.find('input')
  await input.setValue('XXX901010')
  expect(wrapper.vm.isValid).toBe(false)
})

it('not pass RFC 123456789', async () => {
  const wrapper = mount(RFCInput)
  const input = wrapper.find('input')
  await input.setValue('123456789')
  expect(wrapper.vm.isValid).toBe(false)
})

it('pass RFC AAAA010101AAA', async () => {
  const wrapper = mount(RFCInput)
  const input = wrapper.find('input')
  await input.setValue('AAAA010101AAA')
  expect(wrapper.vm.isValid).toBe(true)
})

it('not pass RFC with invalid moral pattern', async () => {
  const wrapper = mount(RFCInput)
  const input = wrapper.find('input')
  await input.setValue('ABC90010112')
  expect(wrapper.vm.isValid).toBe(false)
})

it('pass RFC of moral entity', async () => {
  const wrapper = mount(RFCInput)
  const input = wrapper.find('input')
  await input.setValue('ABC900101AAA')
  expect(wrapper.vm.isValid).toBe(true)
})
