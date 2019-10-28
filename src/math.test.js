import { expect } from 'chai'
import { sum } from './math'

describe('sum function', () => {
    it('sums up two integers', () => {
        const result = sum(1, 2)
        expect(result).to.eql(3)
    })
})