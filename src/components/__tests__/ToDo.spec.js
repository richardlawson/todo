import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import ToDo from '../ToDo.vue'
import LocalStorageMock from './LocalStorageMock.js'

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock()
});

beforeEach(async () => {
 window.localStorage.clear()
})

describe('ToDo', () => {

  it('renders properly', async () => {
    const wrapper = mount(ToDo, {})

    expect(wrapper.text()).contains('Pending')
  })

  it('adds a new task to pending list on form submission', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const taskInput = wrapper.find('#task')
    await taskInput.setValue('Test task')
    await wrapper.get('form').trigger('submit')

    expect(vm.items[0].task).toBe('Test task')
    expect(taskInput.text()).toBe('')
  })

  it('does not add an empty string to the pending list on form submission', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const itemsLength = vm.items.length
    const taskInput = wrapper.find('#task')
    await taskInput.setValue('')
    await wrapper.get('form').trigger('submit')

    expect(vm.items.length).toBe(itemsLength)
  })

  it('moves a pending item to completed on selection', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const taskInput = wrapper.find('#task')
    await taskInput.setValue('Test task')
    await wrapper.get('form').trigger('submit')
    await wrapper.get('input[type=checkbox]').trigger('click')

    expect(vm.items.length).toBe(0)
    expect(vm.completedItems.length).toBe(1)
  })

  it('deletes an item from the completed list when the delete button is clicked', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const taskInput = wrapper.find('#task')
    await taskInput.setValue('Test task')
    await wrapper.get('form').trigger('submit')

    await wrapper.get('input[type=checkbox]').trigger('click')

    expect(vm.completedItems.length).toBe(1)

    await wrapper.get('#delete-1').trigger('click')

    expect(vm.completedItems.length).toBe(0)
  })

  it('assigns a new id to a task when it is created', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const taskInput = wrapper.find('#task')
    await taskInput.setValue('Test task')
    await wrapper.get('form').trigger('submit')

    await taskInput.setValue('Test task 2')
    await wrapper.get('form').trigger('submit')

    expect(vm.items[0].id).toBe(2)
  })

  it('reverts an item from the completed list to the pending list when the revert button is clicked', async () => {
    const wrapper = mount(ToDo, {})
    const vm = wrapper.vm

    const taskInput = wrapper.find('#task')
    await taskInput.setValue('Test task')
    await wrapper.get('form').trigger('submit')

    await wrapper.get('input[type=checkbox]').trigger('click')

    expect(vm.completedItems.length).toBe(1)

    await wrapper.get('#revert-1').trigger('click')

    expect(vm.items.length).toBe(1)
    expect(vm.completedItems.length).toBe(0)
  })
})

