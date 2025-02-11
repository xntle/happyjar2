import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenWrapper from '../../components/ScreenWrapper';


const Shoutout = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shoutoutText, setShoutoutText] = useState('');

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles') // Replace with your table name
        .select('id, username, avatar_url')
        .ilike('username', `%${searchQuery}%`); // Filter by search query

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  // Render each avatar in the grid
  const renderAvatar = ({ item }) => (
    <TouchableOpacity style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{ uri: item.avatar_url || 'https://via.placeholder.com/150' }}
        resizeMode="cover"
      />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      {/* Header */}

      <View style={styles.container}>
        {/* New Message Section */}
        <View style={styles.newMessageContainer}>
          <Text style={styles.newMessageText}>New Message</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Avatar Grid */}
        <FlatList
          data={users}
          renderItem={renderAvatar}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.avatarGrid}
        />

        {/* Shoutout Text Input */}
        <View style={styles.shoutoutInputContainer}>
          <TextInput
            style={styles.shoutoutInput}
            placeholder="Write a shoutout..."
            value={shoutoutText}
            onChangeText={setShoutoutText}
            multiline
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Shoutout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  newMessageContainer: {
    marginBottom: 16,
  },
  newMessageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  avatarGrid: {
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  shoutoutInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
  shoutoutInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 8,
  },
});

