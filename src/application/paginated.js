// let allCards = [1,2,3,4,5,6,7,8,9,10,11];
// let cardsParPage = 3;
// let actualPage = 1;

export function paginated(allCards, cardsPerPage, actualPage) {
    // allCards [] // cardPerPage (int) // actualPage (int)
    // console.log('se llamó', actualPage)
    if (allCards && cardsPerPage && actualPage) {
        // console.log('se llamó y entró', actualPage)
        let lastPage = Math.ceil(allCards.length / cardsPerPage); // Max

        if (lastPage >= actualPage) {
            let index = cardsPerPage * actualPage;
            let cards = allCards.slice((index - cardsPerPage), index);
            let nextPage;
            if (lastPage > actualPage) {
                nextPage = actualPage + 1
            }
            // console.log(cards, index) // [ 1, 2, 3 ] 3
            return { cards, nextPage }

        }
    }

}
// paginated(allCards, cardsParPage, actualPage)
// { cards: [ 1, 2, 3 ], nextPage: 2 }
// { cards: [ 4, 5, 6 ], nextPage: 3 }
// { cards: [ 7, 8, 9 ], nextPage: 4 }
// { cards: [ 10, 11 ], nextPage: undefined }