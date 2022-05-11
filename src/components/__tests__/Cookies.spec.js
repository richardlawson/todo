import {describe, it, expect} from 'vitest'

import {mount, flushPromises} from '@vue/test-utils'
import Cookies from '../Cookies.vue'
import LocalStorageMock from './LocalStorageMock.js'

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock()
});

beforeEach(async () => {
 window.localStorage.clear()
})

describe('Cookies', () => {

  it('renders properly', async () => {
    const wrapper = mount(Cookies, {})
    await flushPromises();

    expect(wrapper.text()).contains('We use cookies')
  })

  it('does not show cookie banner if user has already allowed cookies', async () => {
    window.localStorage.setItem('allowCookies', '1')

    const wrapper = mount(Cookies, {})

    expect(wrapper.text()).not.contains('We use cookies')
  })

  it('it hides cookie banner if user clicks acceptance with policy', async () => {
    const wrapper = mount(Cookies, {})
    await flushPromises();

    expect(wrapper.text()).contains('We use cookies')

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).not.contains('We use cookies')
    expect(window.localStorage.getItem('allowCookies')).toBe('1')
  })
})

