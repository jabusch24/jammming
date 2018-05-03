fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: playlistName
      })
    }).then(response => response.json()).then(jsonResponse => playlistId = jsonResponse.id).then(
      () => fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          uris: trackURIs
        })
      }).then(response => console.log(response.json()))
    )});
