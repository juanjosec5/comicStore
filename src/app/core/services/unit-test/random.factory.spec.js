describe('randomFactory', function () {
    var $rootScope,
        randomFactory,
        numArray = [9,3,8];

    beforeEach(module('coreModule'));
    beforeEach(inject(function (_$rootScope_, _randomFactory_) {
        $rootScope = _$rootScope_;
        randomFactory = _randomFactory_;
    }));

    describe('greaterThan', function () {
        it('should order number array in ascending order', function () {
            var orderArray = randomFactory.greaterThan(numArray);

            expect(orderArray).toEqual([3,8,9]);
        });

        it('should return null when parameter is empty array', function () {
            var orderArray = randomFactory.greaterThan([]);

            expect(orderArray).toBeNull();
        });

        it('should return null when no parameter is given', function () {
            var orderArray = randomFactory.greaterThan();

            expect(orderArray).toBeNull();
        });

        it('should order array in descending order', function(){
            var orderArray = randomFactory.greaterThan(numArray, true);

            expect(orderArray).toEqual([9,8,3]);
        })
    })
});
