import { from } from 'rxjs';
import { concatMap, map, mergeAll, mergeMap, toArray } from 'rxjs/operators';
import { CustomHttpResponse, HttpClient } from '../http/http-client';
import { userModelMapper } from '../mapper/user-mapper';
import { User, UserModel } from '../model/user-model';

const testUrl = 'https://jsonplaceholder.typicode.com/users';

const errorUrl = 'https://jsonplaceholder.typicode.com/users111';

type UsersList = { users: User[]; user?: UserModel };

// 순차처리 해야할 경우
export const concatMapExample = () => {
    const users: Array<User> = [];
    const http: HttpClient = new HttpClient();
    http.get(testUrl)
        .pipe(
            // 추가 로직을 수행하고 싶을 경우
            map((response: CustomHttpResponse<User[]>) => {
                const concatMapData: UsersList = { users: [] };
                const dataSize = response.data.length;
                for (let i = 0; i < dataSize; i++) {
                    users.push(response.data[i]);
                }
                concatMapData.users = users;
                return concatMapData;
            }),
            concatMap((response: UsersList) => {
                return http.get(`${testUrl}/${response.users[2].id}`);
            }),
            map((response: CustomHttpResponse<User>) => {
                return userModelMapper(response.data);
            })
            // catchError((error) => { // 추가 error 처리 해야할 경우.
            //     throw 'server error';
            // })
            // 순서 있게 전부 받아야 할 경우
            // toArray()
        )
        .subscribe(
            (response: UserModel) => {
                console.log('concatMapExample.response : ', response, users);
            },
            (error) => {
                console.log(error);
            },
            () => {}
        );
};

// 순서없이 병렬처리 해야할 경우.
export const mergeMapExample = () => {
    const http: HttpClient = new HttpClient();
    http.get(testUrl)
        .pipe(
            map((response: CustomHttpResponse<User[]>) =>
                response.data.map((user: User) => user.id)
            )
        )
        .subscribe((ids: number[]) => {
            from(ids)
                .pipe(
                    mergeMap((id: number) => http.get(`${testUrl}/${id}`)),
                    map((response: CustomHttpResponse<User>) =>
                        userModelMapper(response.data)
                    )
                )
                .subscribe((response: UserModel) => {
                    console.log('mergeMapExample.response : ', response);
                });
        });
};

// 병렬처리를 한번에 가져와야할 경우.
export const mergeMapToArrayExample = () => {
    const http: HttpClient = new HttpClient();
    http.get(testUrl)
        .pipe(
            map((response: CustomHttpResponse<User[]>) =>
                response.data.map((user: User) => user.id)
            )
        )
        .subscribe((ids: number[]) => {
            from(ids)
                .pipe(
                    mergeMap((id: number) => http.get(`${testUrl}/${id}`)),
                    map((response: CustomHttpResponse<User>) =>
                        userModelMapper(response.data)
                    ),
                    toArray()
                )
                .subscribe((response: UserModel[]) => {
                    console.log('mergeMapToArrayExample.response : ', response);
                });
        });
};

// 병렬처리를 한번에 가져와야할 경우 두번째.
export const mergeAllExample = () => {
    const http: HttpClient = new HttpClient();
    http.get(testUrl)
        .pipe(
            mergeMap((response: CustomHttpResponse<User[]>) =>
                response.data.map((user: User) =>
                    http.get(`${testUrl}/${user.id}`)
                )
            ),
            mergeAll(),
            map((response: CustomHttpResponse<User>) =>
                userModelMapper(response.data)
            ),
            toArray()
        )
        .subscribe((response: any) => {
            console.log('mergeAllExample.result : ', response);
        });
};
