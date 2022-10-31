import { from, zip } from 'rxjs';
import { concatMap, map, mergeAll, mergeMap, toArray } from 'rxjs/operators';
import { CustomHttpResponse, HttpClient } from '../http/http-client';
import { userModelMapper } from '../mapper/user-mapper';
import { User, UserModel } from '../model/user-model';

const testUrl = 'https://jsonplaceholder.typicode.com/users';

const errorUrl = 'https://jsonplaceholder.typicode.com/users111';

type UsersList = { users: User[]; user?: UserModel };

// 순차처리하면서 머지 해야할 경우
export const concatMapExample = () => {
    const http: HttpClient = new HttpClient();
    http.get(testUrl)
        .pipe(
            map((response: CustomHttpResponse<User[]>) => {
                const concatMapData: UsersList = { users: [] };
                const dataSize = response.data.length;
                for (let i = 0; i < dataSize; i++) {
                    concatMapData.users.push(response.data[i]);
                }
                return concatMapData;
            }),
            concatMap((response: UsersList) => {
                return http.get(`${testUrl}/${response.users[2].id}`).pipe(
                    map((result: CustomHttpResponse<User>) => {
                        response.user = userModelMapper(result.data);
                        return response;
                    })
                );
            })
        )
        .subscribe(
            (response: UsersList) => {
                console.log('concatMapExample.response : ', response);
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

// 병렬처리를 한번에 가져와야할 경우 세번째.
export const zipExample = () => {
    const http: HttpClient = new HttpClient();
    const https = [
        http.get(`${testUrl}/1`),
        http.get(`${testUrl}/2`),
        http.get(`${testUrl}/3`),
        http.get(`${testUrl}/4`),
        http.get(`${testUrl}/5`),
    ];
    zip(...https).subscribe((response: CustomHttpResponse<User>[]) => {
        console.log('zipExample.result: ', response);
    });
};

type UserData = { [key: string]: User };

export const zipExampleByMergeData = () => {
    const http: HttpClient = new HttpClient();
    const https = [
        http.get(`${testUrl}/1`),
        http.get(`${testUrl}/2`),
        http.get(`${testUrl}/3`),
        http.get(`${testUrl}/4`),
        http.get(`${testUrl}/5`),
    ];
    zip(...https)
        .pipe(
            map((response: CustomHttpResponse<User>[]) => {
                const result: UserData = {};
                for (let i = 0; i < response.length; i++) {
                    result[response[i].data.id] = response[i].data;
                }
                return result;
            })
        )
        .subscribe((response: UserData) => {
            console.log('zipExample.result: ', response);
        });
};

export const zipExampleByMergeData2 = () => {
    const http: HttpClient = new HttpClient();
    const result: UserData = {};
    http.get(`${testUrl}/1`).pipe(
        tap(
            (response: CustomHttpResponse<User>) =>
                (result[response.data.id] = response.data)
        ),
        concatMap(() => http.get(`${testUrl}/2`)),
        tap(
            (response: CustomHttpResponse<User>) =>
                (result[response.data.id] = response.data)
        ),
        concatMap(() => http.get(`${testUrl}/3`)),
        tap(
            (response: CustomHttpResponse<User>) =>
                (result[response.data.id] = response.data)
        ),
        concatMap(() => http.get(`${testUrl}/4`)),
        tap(
            (response: CustomHttpResponse<User>) =>
                (result[response.data.id] = response.data)
        ),
        concatMap(() => http.get(`${testUrl}/5`)),
    ).subscribe((response: CustomHttpResponse<User>) => {
        result[response.data.id] = response.data;
        console.log('result : ', result);
    });
};
