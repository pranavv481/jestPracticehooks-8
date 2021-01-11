import moxios from 'moxios';
import {getSecretWord} from "./hookAction";

describe('moxios tests', ()=>{
    beforeEach(()=>{
        moxios.install()
    })
    afterEach(()=>{
        moxios.uninstall()
    })

    test('call the get secret word callback an axios response', async()=>{
        const secretWord = 'party'
        moxios.wait(()=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:secretWord
            })
        })
        // create mock for callback arg
        const mockSetSecretWord = jest.fn();
        await getSecretWord(mockSetSecretWord);

        // see mock was run with correct argument
        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
    })
   
})