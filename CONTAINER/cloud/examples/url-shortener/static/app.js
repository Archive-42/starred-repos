"use strict";

const getHeaders = (password) => ({
  Authorization: `Bearer ${
    password || localStorage.getItem("serverless-go") || ""
  }`,
  "Content-Type": "application/json",
});

const slugifyString = (string) =>
  string &&
  string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_]+/g, "-") // Replace any run of disallowed chars with a hyphen
    .replace(/^-+/, ""); // Remove leading hyphens

const DeleteIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5H3H19"
      stroke="#7C7C7C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5H17Z"
      stroke="#7C7C7C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10V16"
      stroke="#7C7C7C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 10V16"
      stroke="#7C7C7C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2C16.2626 1.73735 16.5744 1.52901 16.9176 1.38687C17.2608 1.24473 17.6286 1.17157 18 1.17157C18.3714 1.17157 18.7392 1.24473 19.0824 1.38687C19.4256 1.52901 19.7374 1.73735 20 2C20.2626 2.26264 20.471 2.57444 20.6131 2.9176C20.7553 3.26077 20.8284 3.62856 20.8284 4C20.8284 4.37143 20.7553 4.73923 20.6131 5.08239C20.471 5.42555 20.2626 5.73735 20 6L6.5 19.5L1 21L2.5 15.5L16 2Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11.08V12C20.9988 14.1564 20.3005 16.2547 19.0093 17.9818C17.7182 19.709 15.9033 20.9725 13.8354 21.5839C11.7674 22.1953 9.55726 22.1219 7.53447 21.3746C5.51168 20.6273 3.78465 19.2461 2.61096 17.4371C1.43727 15.628 0.879791 13.4881 1.02168 11.3363C1.16356 9.18455 1.99721 7.13631 3.39828 5.49706C4.79935 3.85781 6.69279 2.71537 8.79619 2.24013C10.8996 1.7649 13.1003 1.98232 15.07 2.85999"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 4L11 14.01L8 11.01"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Copy = ({ content }) => {
  const [prevContent, setPrevContent] = React.useState(content);
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(content);
    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  React.useEffect(() => {
    if (content !== prevContent) {
      handleCopy();
    }
  }, [content]);
  return (
    <Button
      style={{ width: "100px" }}
      onClick={handleCopy}
      className={copied ? "success" : "grey"}
    >
      {copied ? (
        "Copied"
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H5"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 1H6C5.44772 1 5 1.44772 5 2V4C5 4.55228 5.44772 5 6 5H12C12.5523 5 13 4.55228 13 4V2C13 1.44772 12.5523 1 12 1Z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Button>
  );
};
const Collapsible = React.forwardRef(
  ({ collapsed, as = "div", ...props }, outerRef) => {
    const ref = React.useRef(outerRef);
    const [height, setHeight] = React.useState(collapsed ? 0 : undefined);

    React.useLayoutEffect(() => {
      if (ref.current === null) {
        return;
      }

      if (collapsed) {
        setHeight(0);
        return;
      }

      setHeight(ref.current.scrollHeight);
    }, [ref, collapsed]);

    return React.createElement(as, {
      ...props,
      ref,
      style: {
        overflow: "hidden",
        transition: "height 300ms ease-in-out",
        height,
        display: "grid",
        gridTemplateColumns: "auto min-content",
        gap: "15px",
        ...props.style,
      },
    });
  }
);
const Login = ({ fetchItems, setAuthorized }) => {
  const storedPassword = localStorage.getItem("serverless-go") || "";
  const [password, setPassword] = React.useState(storedPassword);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (storedPassword) {
      handleLogin(storedPassword);
    }
  }, [storedPassword]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await fetchItems(password);
      setLoading(false);
      setAuthorized(true);
    } catch (e) {
      setErrorMessage("Unauthorized");
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <Input
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleLogin();
          }
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <br />

      <Button className="primary" onClick={handleLogin}>
        {loading ? <Spinner small primary /> : "Login"}
      </Button>
      <br />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </LoginWrapper>
  );
};
const ListItemRow = ({ item, addUrl, deleteUrl, index, setNewUrl }) => {
  const inputRef = React.useRef(null);
  const [url, setUrl] = React.useState((item && item.url) || "");
  const [name, setName] = React.useState((item && item.name) || "");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(!item);

  const handleAddUrl = async () => {
    setLoadingAdd(true);
    try {
      if (item && url === item.url) {
        setLoadingAdd(false);
        return;
      }
      await addUrl({ name, url, isNew: !item });
      if (!item) {
        setUrl("");
        setName("");
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
    setLoadingAdd(false);
  };
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteUrl(name);
      
    } catch (e) {
      setErrorMessage(e.message);
      setLoadingDelete(false);
    }
  };

  const handleEdit = async () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      await handleAddUrl();
      setIsEdit(false);
    }
  };
  React.useEffect(() => {
    if (!item && isEdit && inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit]);
  return (
    <div>
      <ListRow isNew={!item}>
        <InputWrapper>
          {item && index === 0 && <Label>URL</Label>}
          <Input
            style={{ opacity: item && !isEdit ? 0.5 : 1 }}
            ref={inputRef}
            placeholder="https://go.serverless.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (!item) {
                setNewUrl("");
              }
              setErrorMessage("");
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleAddUrl();
                setIsEdit(false);
              }
            }}
          />
        </InputWrapper>
        <InputWrapper>
          {item && index === 0 && <Label>&nbsp;</Label>}
          <h3>/</h3>
        </InputWrapper>

        <InputWrapper>
          {item && index === 0 && <Label>Name</Label>}
          <Input
            disabled={!!item}
            style={{ opacity: item ? 0.5 : 1 }}
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(slugifyString(e.target.value));
              if (!item) {
                setNewUrl("");
              }
              setErrorMessage("");
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleAddUrl();
              }
            }}
          />
        </InputWrapper>
        {item && (
          <InputWrapper>
            <Button
              className={isEdit && !loadingAdd ? "success" : "grey"}
              onClick={handleEdit}
            >
              {loadingAdd ? (
                <Spinner small />
              ) : isEdit ? (
                <Check />
              ) : (
                <EditIcon />
              )}
            </Button>
          </InputWrapper>
        )}
        {item && (
          <InputWrapper>
            {item && index === 0 && <Label>Short URL</Label>}
            <Input
              disabled
              placeholder="Short URL"
              value={(item && item.shortUrl) || ""}
            />
          </InputWrapper>
        )}
        {item && (
          <InputWrapper>
            <Copy content={item.shortUrl} />
          </InputWrapper>
        )}
        {item && (
          <InputWrapper>
            <Button onClick={handleDelete}>
              {loadingDelete ? <Spinner small /> : <DeleteIcon />}
            </Button>
          </InputWrapper>
        )}

        {item ? null : (
          <Button className={"primary"} onClick={handleAddUrl}>
            {loadingAdd ? <Spinner small primary /> : "Add"}
          </Button>
        )}
      </ListRow>
      {!item && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

const App = () => {
  const storedPassword = localStorage.getItem("serverless-go") || "";
  const [items, setItems] = React.useState([]);
  const [newUrl, setNewUrl] = React.useState("");
  const [loadingItems, setLoadingItems] = React.useState(false);
  const [authorized, setAuthorized] = React.useState(!!storedPassword);

  React.useEffect(() => {
    try {
      fetchItems();
    } catch (e) {
      setAuthorized(false);
    }
  }, []);
  /**
   * Fetch all existing URLs
   * @param {String} password - Password to use in authentication
   */
  const fetchItems = async (password = storedPassword) => {
    if (!items.length) {
      setLoadingItems(true);
    }
    const result = await fetch(`/list`, {
      method: "GET",
      headers: getHeaders(password),
    });
    if (result.ok) {
      const items = await result.json();

      setItems(items.redirects);
      /**
       * Store password in localstorage
       */
      localStorage.setItem("serverless-go", password);
    } else {
      throw new Error("Unauthorized");
    }
    setLoadingItems(false);
  };
  /**
   * Add and Update URL
   */
  const addUrl = async ({ url, name, isNew }) => {
    if (!url) {
      throw new Error("Please add a valid URL");
    }
    const result = await fetch(`/`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        url,
        name,
      }),
    });
    if (result.ok) {
      const item = await result.json();
      if (isNew) {
        setItems((prev) => [...prev, item]);
        setNewUrl(item.shortUrl);
      }

      await fetchItems();
    } else {
      const json = await result.json();

      throw new Error(json.message);
    }
  };
  /**
   * Delete URL
   */
  const deleteUrl = async (name) => {
    const result = await fetch(`/${name}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (result.ok) {
      setItems((prev) => prev.filter((i) => i.name !== name));
      await fetchItems();
    } else {
      const json = await result.json();

      throw new Error(json.message);
    }
  };
  /**
   * Destroy session
   */
  const logout = () => {
    localStorage.removeItem("serverless-go");
    window.location.reload();
  };
  return (
    <AppWrapper>
      <GlobalStyle />
      <CloudDotsWrapper>
        <img src="/assets/cloud-dots.svg" alt="Serverless Cloud" />
        <img src="/assets/cloud-dots.svg" alt="Serverless Cloud" />
      </CloudDotsWrapper>
      <Container>
        <Header>
          <img src="/assets/serverless-cloud-text.svg" alt="Serverless Cloud" />
          {!authorized ? (
            <div>
              <MainTitle>go.serverless.com</MainTitle>
              <Subtitle>A serverless url shortner</Subtitle>
            </div>
          ) : null}
        </Header>
        <div>
          {authorized ? (
            <ListWrapper>
              <Divider />
              <h2>Add new URL</h2>
              <ListItemRow addUrl={addUrl} setNewUrl={setNewUrl} />

              <Collapsible collapsed={!newUrl}>
                <Input value={newUrl} disabled style={{ width: "auto" }} />
                <Copy content={newUrl} />
              </Collapsible>
              <Divider />
              <h2>Existing URLs</h2>
              {loadingItems ? (
                <Spinner />
              ) : (
                items.map((item, index) => (
                  <ListItemRow
                    addUrl={addUrl}
                    item={item}
                    key={`item-row-${item.name}`}
                    deleteUrl={deleteUrl}
                    index={index}
                  />
                ))
              )}
            </ListWrapper>
          ) : (
            <Login fetchItems={fetchItems} setAuthorized={setAuthorized} />
          )}
        </div>
        {authorized && (
          <LogoutWrapper>
            <Button onClick={logout}>Logout</Button>
          </LogoutWrapper>
        )}
      </Container>
    </AppWrapper>
  );
};
const domContainer = document.querySelector("#root");
ReactDOM.render(React.createElement(App), domContainer);
