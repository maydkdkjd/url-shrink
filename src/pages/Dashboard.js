import React, { useCallback, useEffect, useState } from "react";
import { Paper, Typography, Button, TextField, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Box, Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactComponent as Spinner } from '../media/spinner.svg'
import useUser from "../contexts/user";
import { serverUrl } from '../config/config';

const UrlRow = ({ url, shortUrl, lastModified, deleteUrl, updateUrl }) => {
  const [edit, setEdit] = useState(false);
  const [editUrl, setEditUrl] = useState(url);

  const toggleEdit = (e) => {
    setEdit(!edit);
  }

  const handleUpdate = (e) => {
    if (editUrl === url) {
      toggleEdit();
      return;
    }
    updateUrl(shortUrl, editUrl)
      .finally(() => {
        toggleEdit();
      })
  }

  return (
    <TableRow key={shortUrl}>
      <TableCell sx={{ whiteSpace: 'pre' }}>
        {new Date(lastModified).toLocaleString('en-IN', {
          timeStyle: "medium", dateStyle: "medium"
        })}
      </TableCell>
      <TableCell sx={{ maxWidth: 266, maskImage: 'linear-gradient(90deg,transparent,#fff 16px,#fff 90%,transparent)' }}>
        {!edit ? (
          <Link href={`${url}`} target="_blank" rel="noreferrer" sx={{ whiteSpace: 'pre' }}>
            {url}
          </Link>
        ) : (
          <TextField variant="standard"
            value={editUrl}
            onChange={e => { setEditUrl(e.target.value) }}
            fullWidth={true}
            focused={true}
          />
        )}
      </TableCell>
      <TableCell>
        <Link href={`${serverUrl}/u/${shortUrl}`} target="_blank" rel="noreferrer">
          {`${serverUrl}/u/${shortUrl}`}
        </Link>
      </TableCell>
      <TableCell sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} align="center">
        {!edit ? (
          <Button title="Edit URL" onClick={toggleEdit}>
            <EditIcon />
          </Button>
        ) : (
          url === editUrl ? (
            <Button title="Cancel" onClick={handleUpdate}>
              <CancelIcon color="secondary" />
            </Button>) : (
            <Button title="Save changes" onClick={handleUpdate}>
              <SaveIcon color="action" />
            </Button>)
        )}
        <Button title="Delete URL" onClick={() => { deleteUrl(shortUrl) }}>
          <DeleteIcon color="info" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Dashboard = () => {
  const { user } = useUser();
  const [url, setUrl] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/urls/add`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ targetUrl: url }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(resJson => {
        if (resJson) {
          setUrl('');
          fetchUrls();
        }
      }).catch(err => {
        console.log(err);
      })
  }

  const fetchUrls = useCallback(() => {
    setLoading(true);
    fetch(`/urls/${user.id}`)
      .then(res => res.json())
      .then(jsonRes => {
        setRows(jsonRes);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [setLoading, setRows, user])

  const updateUrl = (shortUrl, url) =>
    fetch(`/urls/update`, {
      method: 'POST',
      body: JSON.stringify({
        shortUrl: shortUrl,
        url: url,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(jsonRes => {
        fetchUrls();
      })
      .catch(err => {
        console.log(err);
      })

  const deleteUrl = (shortUrl) => {
    fetch(`/urls/delete`, {
      method: 'POST',
      body: JSON.stringify({ shortUrl: shortUrl }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(jsonRes => {
        fetchUrls();
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    console.log(serverUrl);
    fetchUrls();
  }, [fetchUrls])

  return (
    <Box>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" >
          Welcome, {user.firstName}
        </Typography>

        <Paper variant="elevation" sx={{ p: 4, margin: 'auto', my: 4, bgcolor: '#f6f8fa' }} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" fontFamily={'monospace'} fontWeight={700} mb={2}>
            Shorten a URL
          </Typography>
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="URL to shorten"
            name="url"
            value={url}
            onChange={e => { setUrl(e.target.value) }}
          />

          <Button type="submit" variant='outlined' fullWidth>
            Generate
          </Button>
        </Paper>

        <Paper variant="elevation" sx={{ p: 4, my: 4 }}>
          <Typography variant="h6" component="h2" fontFamily={'monospace'} fontWeight={700} mb={2}>
            Your Short URLs
          </Typography>

          {loading ? <Spinner /> : rows.length ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#333' }} align="left">Last Modified</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#333' }} align="left">URL</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#333' }} align="left">Short URL</TableCell>
                    <TableCell sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#333' }} align="center" width="200px">Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <UrlRow {...row} key={row.shortUrl}
                      deleteUrl={deleteUrl}
                      updateUrl={updateUrl}
                    />
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2">
              Nothing here yet. Your shortened URLs will appear here
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default Dashboard;