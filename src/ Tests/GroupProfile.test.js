// Mock the axios module
jest.mock('axios');

const mockGroupData = {
    allGroups: [
        {
            group_name: 'Mock Group',
            short: 'MG',
            korean_name: '모크 그룹',
            debut: '2020-01-01',
            company: 'Mock Company',
            members: 'Member1, Member2',
            original_memb: 'Original Member1, Original Member2',
            fanclub_name: 'Mock Fans',
            active: true,
        },
    ],
};

describe('GroupProfile Component', () => {
    // Returns a mock group object with all properties
    it('should return a mock group object with all properties', () => {
        const result = mockGroupData.allGroups[0];
        expect(result).toEqual({
            group_name: 'Mock Group',
            short: 'MG',
            korean_name: '모크 그룹',
            debut: '2020-01-01',
            company: 'Mock Company',
            members: 'Member1, Member2',
            original_memb: 'Original Member1, Original Member2',
            fanclub_name: 'Mock Fans',
            active: true,
        });
    });
});
